import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';
import { PlantedCropsService } from './planted-crops.service';

@Controller('planted-crops')
export class PlantedCropsController {
  constructor(private readonly plantedCropsService: PlantedCropsService) {}

  @Post()
  create(@Body() createPlantedCropDto: CreatePlantedCropDto) {
    return this.plantedCropsService.create(createPlantedCropDto);
  }
}
