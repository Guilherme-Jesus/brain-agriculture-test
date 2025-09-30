import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody, // 1. Importe o ApiBody
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { FarmsService } from './farms.service';

@ApiTags('farms')
@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova fazenda' })
  @ApiBody({ type: CreateFarmDto })
  @ApiCreatedResponse({
    description: 'Fazenda criada com sucesso.',
    type: Farm,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos para o cadastro.' })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as fazendas' })
  @ApiOkResponse({
    description: 'Lista de fazendas retornada com sucesso.',
    type: [Farm],
  })
  findAll() {
    return this.farmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma fazenda pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da fazenda (UUID)' })
  @ApiOkResponse({
    description: 'Fazenda encontrada com sucesso.',
    type: Farm,
  })
  @ApiNotFoundResponse({ description: 'Fazenda não encontrada.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.farmsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma fazenda pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da fazenda (UUID)' })
  @ApiOkResponse({
    description: 'Fazenda atualizada com sucesso.',
    type: Farm,
  })
  @ApiNotFoundResponse({ description: 'Fazenda não encontrada.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFarmDto: UpdateFarmDto,
  ) {
    return this.farmsService.update(id, updateFarmDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deleta uma fazenda pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da fazenda (UUID)' })
  @ApiNoContentResponse({
    description: 'Fazenda deletada com sucesso.',
  })
  @ApiNotFoundResponse({ description: 'Fazenda não encontrada.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.farmsService.remove(id);
  }
}
