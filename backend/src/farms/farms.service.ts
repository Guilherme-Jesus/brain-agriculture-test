import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantedCrop } from 'src/planted-crops/entities/planted-crop.entity';
import { Producer } from 'src/producers/entities/producer.entity';
import { Repository } from 'typeorm';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    @InjectRepository(PlantedCrop)
    private readonly plantedCropRepository: Repository<PlantedCrop>,
  ) {}

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    const { totalArea, arableArea, vegetationArea, producerId } = createFarmDto;

    // Validação da Regra de Negócio das Áreas
    if (arableArea + vegetationArea > totalArea) {
      throw new BadRequestException(
        'The sum of arable and vegetation area cannot be greater than the total area.',
      );
    }

    const producer = await this.producerRepository.findOneBy({
      id: producerId,
    });
    if (!producer) {
      throw new NotFoundException(
        `Producer with ID "${producerId}" not found.`,
      );
    }

    const farm = this.farmRepository.create({
      ...createFarmDto,
      producer: producer,
    });

    return this.farmRepository.save(farm);
  }

  async findAll(): Promise<Farm[]> {
    return this.farmRepository.find({ relations: ['producer'] });
  }

  async findOne(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id },
      relations: ['producer'],
    });
    if (!farm) {
      throw new NotFoundException(`Farm with ID "${id}" not found`);
    }
    return farm;
  }

  async update(id: string, updateFarmDto: UpdateFarmDto): Promise<Farm> {
    // Primeiro, buscamos a fazenda como ela está hoje, com suas plantações
    const farm = await this.farmRepository.findOne({
      where: { id },
      relations: ['plantedCrops'],
    });

    if (!farm) {
      throw new NotFoundException(`Farm with ID "${id}" not found.`);
    }

    // Pegamos os valores que estão vindo na requisição
    const newArableArea = updateFarmDto.arableArea ?? farm.arableArea;
    const newVegetationArea =
      updateFarmDto.vegetationArea ?? farm.vegetationArea;
    const newTotalArea = updateFarmDto.totalArea ?? farm.totalArea;

    // 1. Validação da regra de negócio que você já tinha
    if (
      Number(newArableArea) + Number(newVegetationArea) >
      Number(newTotalArea)
    ) {
      throw new BadRequestException(
        'The sum of arable and vegetation area cannot be greater than the total area.',
      );
    }

    // 2. NOVA VALIDAÇÃO: Checar a área plantada existente contra a nova área agricultável
    if (updateFarmDto.arableArea !== undefined) {
      const totalPlantedArea = farm.plantedCrops.reduce(
        (sum, crop) => sum + Number(crop.plantedArea),
        0,
      );

      if (totalPlantedArea > Number(newArableArea)) {
        throw new BadRequestException(
          `Cannot update arable area to ${newArableArea}ha because there are already ${totalPlantedArea}ha of planted crops.`,
        );
      }
    }

    // Se passou em todas as validações, podemos salvar
    const farmToUpdate = (await this.farmRepository.preload({
      id,
      ...updateFarmDto,
    })) as Farm;

    return this.farmRepository.save(farmToUpdate);
  }

  async remove(id: string): Promise<void> {
    const result = await this.farmRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Farm with ID "${id}" not found`);
    }
  }
}
