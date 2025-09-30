import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Culture } from 'src/cultures/entities/culture.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Harvest } from 'src/harvests/entities/harvest.entity';
import { Repository } from 'typeorm';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';
import { UpdatePlantedCropDto } from './dto/update-planted-crop.dto';
import { PlantedCrop } from './entities/planted-crop.entity';

@Injectable()
export class PlantedCropsService {
  constructor(
    @InjectRepository(PlantedCrop)
    private readonly plantedCropRepository: Repository<PlantedCrop>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Culture)
    private readonly cultureRepository: Repository<Culture>,
    @InjectRepository(Harvest)
    private readonly harvestRepository: Repository<Harvest>,
  ) {}

  async create(
    createPlantedCropDto: CreatePlantedCropDto,
  ): Promise<PlantedCrop> {
    const { farmId, cultureId, harvestId, plantedArea } = createPlantedCropDto;

    const farm = await this.farmRepository.findOneBy({ id: farmId });
    if (!farm) {
      throw new NotFoundException(`Farm with ID "${farmId}" not found.`);
    }

    const culture = await this.cultureRepository.findOneBy({ id: cultureId });
    if (!culture) {
      throw new NotFoundException(`Culture with ID "${cultureId}" not found.`);
    }

    const harvest = await this.harvestRepository.findOneBy({ id: harvestId });
    if (!harvest) {
      throw new NotFoundException(`Harvest with ID "${harvestId}" not found.`);
    }

    const existingCrops = await this.plantedCropRepository.find({
      where: { farm: { id: farmId } },
    });
    const totalPlantedArea = existingCrops.reduce(
      (sum, crop) => sum + Number(crop.plantedArea),
      0,
    );

    if (totalPlantedArea + plantedArea > farm.arableArea) {
      throw new BadRequestException(
        'The total planted area cannot exceed the arable area of the farm.',
      );
    }

    const newPlantedCrop = this.plantedCropRepository.create({
      plantedArea,
      farm,
      culture,
      harvest,
    });

    return this.plantedCropRepository.save(newPlantedCrop);
  }

  async findAll(): Promise<PlantedCrop[]> {
    return this.plantedCropRepository.find({
      relations: ['farm', 'culture', 'harvest'],
    });
  }

  async findOne(id: string): Promise<PlantedCrop> {
    const plantedCrop = await this.plantedCropRepository.findOne({
      where: { id },
      relations: ['farm', 'culture', 'harvest'],
    });
    if (!plantedCrop) {
      throw new NotFoundException(`Planted Crop with ID "${id}" not found.`);
    }
    return plantedCrop;
  }

  async update(
    id: string,
    updatePlantedCropDto: UpdatePlantedCropDto,
  ): Promise<PlantedCrop> {
    const plantedCrop = await this.plantedCropRepository.preload({
      id: id,
      ...updatePlantedCropDto,
    });

    if (!plantedCrop) {
      throw new NotFoundException(`Planted Crop with ID "${id}" not found.`);
    }

    if (updatePlantedCropDto.plantedArea) {
      const farm = await this.farmRepository.findOneBy({
        id: plantedCrop.farm.id,
      });

      if (!farm) {
        throw new NotFoundException(
          `Associated farm with ID "${plantedCrop.farm.id}" not found.`,
        );
      }

      const otherCrops = await this.plantedCropRepository.find({
        where: { farm: { id: farm.id } },
      });
      const totalOtherArea = otherCrops
        .filter((crop) => crop.id !== id)
        .reduce((sum, crop) => sum + Number(crop.plantedArea), 0);

      if (totalOtherArea + updatePlantedCropDto.plantedArea > farm.arableArea) {
        throw new BadRequestException(
          'The total planted area cannot exceed the arable area of the farm.',
        );
      }
    }

    return this.plantedCropRepository.save(plantedCrop);
  }

  async remove(id: string): Promise<void> {
    const result = await this.plantedCropRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Planted Crop with ID "${id}" not found.`);
    }
  }
}
