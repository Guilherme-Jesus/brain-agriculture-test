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
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Harvest } from './entities/harvest.entity';
import { HarvestsService } from './harvests.service';

@ApiTags('harvests')
@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova safra' })
  @ApiCreatedResponse({
    description: 'Safra criada com sucesso.',
    type: Harvest,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos para o cadastro.' })
  create(@Body() createHarvestDto: CreateHarvestDto) {
    return this.harvestsService.create(createHarvestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as safras' })
  @ApiOkResponse({
    description: 'Lista de safras retornada com sucesso.',
    type: [Harvest],
  })
  @ApiNotFoundResponse({ description: 'Safra não encontrada.' })
  findAll() {
    return this.harvestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma safra pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da safra (UUID)' })
  @ApiOkResponse({
    description: 'Safra encontrada com sucesso.',
    type: Harvest,
  })
  @ApiNotFoundResponse({ description: 'Safra não encontrada.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.harvestsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma safra pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da safra (UUID)' })
  @ApiOkResponse({
    description: 'Safra atualizada com sucesso.',
    type: Harvest,
  })
  @ApiNotFoundResponse({ description: 'Safra não encontrada.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHarvestDto: UpdateHarvestDto,
  ) {
    return this.harvestsService.update(id, updateHarvestDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deleta uma safra pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da safra (UUID)' })
  @ApiNoContentResponse({
    description: 'Safra deletada com sucesso.',
  })
  @ApiNotFoundResponse({ description: 'Safra não encontrada.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.harvestsService.remove(id);
  }
}
