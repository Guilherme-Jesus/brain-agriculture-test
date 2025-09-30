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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CulturesService } from './cultures.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { Culture } from './entities/culture.entity';

@ApiTags('cultures')
@Controller('cultures')
export class CulturesController {
  constructor(private readonly culturesService: CulturesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova cultura' })
  @ApiCreatedResponse({
    description: 'Cultura criada com sucesso.',
    type: Culture,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos para o cadastro.' })
  create(@Body() createCultureDto: CreateCultureDto) {
    return this.culturesService.create(createCultureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as culturas' })
  @ApiOkResponse({
    description: 'Lista de culturas retornada com sucesso.',
    type: [Culture],
  })
  @ApiNotFoundResponse({ description: 'Cultura não encontrada.' })
  findAll() {
    return this.culturesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma cultura pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da cultura (UUID)' })
  @ApiOkResponse({
    description: 'Cultura encontrada com sucesso.',
    type: Culture,
  })
  @ApiNotFoundResponse({ description: 'Cultura não encontrada.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.culturesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma cultura pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da cultura (UUID)' })
  @ApiOkResponse({
    description: 'Cultura atualizada com sucesso.',
    type: Culture,
  })
  @ApiNotFoundResponse({ description: 'Cultura não encontrada.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCultureDto: UpdateCultureDto,
  ) {
    return this.culturesService.update(id, updateCultureDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deleta uma cultura pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da cultura (UUID)' })
  @ApiNoContentResponse({
    description: 'Cultura deletada com sucesso.',
  })
  @ApiNotFoundResponse({ description: 'Cultura não encontrada.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.culturesService.remove(id);
  }
}
