import { Injectable } from '@nestjs/common';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';
import { UpdatePlantedCropDto } from './dto/update-planted-crop.dto';

@Injectable()
export class PlantedCropsService {
  create(createPlantedCropDto: CreatePlantedCropDto) {
    return 'This action adds a new plantedCrop';
  }

  findAll() {
    return `This action returns all plantedCrops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plantedCrop`;
  }

  update(id: number, updatePlantedCropDto: UpdatePlantedCropDto) {
    return `This action updates a #${id} plantedCrop`;
  }

  remove(id: number) {
    return `This action removes a #${id} plantedCrop`;
  }
}
