import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlantedCropsService } from './planted-crops.service';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';
import { UpdatePlantedCropDto } from './dto/update-planted-crop.dto';

@Controller('planted-crops')
export class PlantedCropsController {
  constructor(private readonly plantedCropsService: PlantedCropsService) {}

  @Post()
  create(@Body() createPlantedCropDto: CreatePlantedCropDto) {
    return this.plantedCropsService.create(createPlantedCropDto);
  }

  @Get()
  findAll() {
    return this.plantedCropsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantedCropsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantedCropDto: UpdatePlantedCropDto) {
    return this.plantedCropsService.update(+id, updatePlantedCropDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantedCropsService.remove(+id);
  }
}
