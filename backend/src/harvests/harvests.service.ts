import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Harvest } from './entities/harvest.entity';

@Injectable()
export class HarvestsService {
  constructor(
    @InjectRepository(Harvest)
    private readonly harvestRepository: Repository<Harvest>,
  ) {}

  async create(createHarvestDto: CreateHarvestDto): Promise<Harvest> {
    const normalizedName = createHarvestDto.name.trim().toLowerCase();

    const existingHarvest = await this.harvestRepository.findOneBy({
      name: normalizedName,
    });

    if (existingHarvest) {
      throw new ConflictException(
        `Harvest with name "${createHarvestDto.name}" already exists.`,
      );
    }
    const harvest = this.harvestRepository.create({ name: normalizedName });
    return this.harvestRepository.save(harvest);
  }

  async findAll(): Promise<Harvest[]> {
    return this.harvestRepository.find();
  }

  async findOne(id: string): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOneBy({ id });
    if (!harvest) {
      throw new NotFoundException(`Harvest with ID "${id}" not found.`);
    }
    return harvest;
  }

  async update(
    id: string,
    updateHarvestDto: UpdateHarvestDto,
  ): Promise<Harvest> {
    const harvest = await this.harvestRepository.preload({
      id: id,
      ...updateHarvestDto,
    });
    if (!harvest) {
      throw new NotFoundException(`Harvest with ID "${id}" not found.`);
    }

    if (updateHarvestDto.name) {
      const normalizedName = updateHarvestDto.name.trim().toLowerCase();
      const existingHarvest = await this.harvestRepository.findOneBy({
        name: normalizedName,
      });

      if (existingHarvest && existingHarvest.id !== id) {
        throw new ConflictException(
          `Harvest with name "${updateHarvestDto.name}" already exists.`,
        );
      }
      harvest.name = normalizedName;
    }

    return this.harvestRepository.save(harvest);
  }

  async remove(id: string): Promise<void> {
    const result = await this.harvestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Harvest with ID "${id}" not found.`);
    }
  }
}
