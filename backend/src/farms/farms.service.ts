import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const farm = await this.farmRepository.preload({
      id: id,
      ...updateFarmDto,
    });

    if (!farm) {
      throw new NotFoundException(`Farm with ID "${id}" not found`);
    }

    // Validação da Regra de Negócio das Áreas (também na atualização!)
    if (farm.arableArea + farm.vegetationArea > farm.totalArea) {
      throw new BadRequestException(
        'The sum of arable and vegetation area cannot be greater than the total area.',
      );
    }

    return this.farmRepository.save(farm);
  }

  async remove(id: string): Promise<void> {
    const result = await this.farmRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Farm with ID "${id}" not found`);
    }
  }
}
