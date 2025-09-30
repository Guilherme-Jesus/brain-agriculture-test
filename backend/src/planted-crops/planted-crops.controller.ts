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
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';
import { UpdatePlantedCropDto } from './dto/update-planted-crop.dto';
import { PlantedCrop } from './entities/planted-crop.entity';
import { PlantedCropsService } from './planted-crops.service';

@ApiTags('planted-crops')
@Controller('planted-crops')
export class PlantedCropsController {
  constructor(private readonly plantedCropsService: PlantedCropsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova cultura plantada' })
  @ApiCreatedResponse({
    description: 'Cultura plantada criada com sucesso.',
    type: PlantedCrop,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos para o cadastro.' })
  create(@Body() createPlantedCropDto: CreatePlantedCropDto) {
    return this.plantedCropsService.create(createPlantedCropDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as culturas plantadas' })
  @ApiOkResponse({
    description: 'Lista de culturas plantadas retornada com sucesso.',
    type: [PlantedCrop],
  })
  @ApiNotFoundResponse({ description: 'Cultura plantada não encontrada.' })
  findAll() {
    return this.plantedCropsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma cultura plantada pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da cultura plantada (UUID)' })
  @ApiOkResponse({
    description: 'Cultura plantada encontrada com sucesso.',
    type: PlantedCrop,
  })
  @ApiNotFoundResponse({ description: 'Cultura plantada não encontrada.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.plantedCropsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma cultura plantada pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da cultura plantada (UUID)' })
  @ApiOkResponse({
    description: 'Cultura plantada atualizada com sucesso.',
    type: PlantedCrop,
  })
  @ApiBadRequestResponse({
    description:
      'Área plantada excede a área arável da fazenda ou dados inválidos.',
  })
  @ApiNotFoundResponse({ description: 'Cultura plantada não encontrada.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePlantedCropDto: UpdatePlantedCropDto,
  ) {
    return this.plantedCropsService.update(id, updatePlantedCropDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deleta uma cultura plantada pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da cultura plantada (UUID)' })
  @ApiNoContentResponse({
    description: 'Cultura plantada deletada com sucesso.',
  })
  @ApiNotFoundResponse({ description: 'Cultura plantada não encontrada.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.plantedCropsService.remove(id);
  }
}
