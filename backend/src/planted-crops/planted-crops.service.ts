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

    // 1. Validação: Buscar todas as entidades pelos IDs fornecidos
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

    // 2. Validação da Regra de Negócio: Área plantada vs. Área agricultável
    // Busca todas as culturas já plantadas nesta fazenda
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

    // 3. Se tudo estiver ok, cria e salva a nova entrada
    const newPlantedCrop = this.plantedCropRepository.create({
      plantedArea,
      farm,
      culture,
      harvest,
    });

    return this.plantedCropRepository.save(newPlantedCrop);
  }
}
