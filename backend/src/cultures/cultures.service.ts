import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { Culture } from './entities/culture.entity';

@Injectable()
export class CulturesService {
  constructor(
    @InjectRepository(Culture)
    private readonly cultureRepository: Repository<Culture>,
  ) {}

  async create(createCultureDto: CreateCultureDto): Promise<Culture> {
    const normalizedName = createCultureDto.name.trim().toLowerCase();

    const existingCulture = await this.cultureRepository.findOneBy({
      name: normalizedName,
    });

    if (existingCulture) {
      throw new ConflictException(
        `Culture with name "${createCultureDto.name}" already exists.`,
      );
    }

    const culture = this.cultureRepository.create({ name: normalizedName });
    return this.cultureRepository.save(culture);
  }

  async findAll(): Promise<Culture[]> {
    return this.cultureRepository.find();
  }

  async findOne(id: string): Promise<Culture> {
    const culture = await this.cultureRepository.findOneBy({ id });
    if (!culture) {
      throw new NotFoundException(`Culture with ID "${id}" not found.`);
    }
    return culture;
  }

  async update(
    id: string,
    updateCultureDto: UpdateCultureDto,
  ): Promise<Culture> {
    const culture = await this.cultureRepository.preload({
      id: id,
      ...updateCultureDto,
    });
    if (!culture) {
      throw new NotFoundException(`Culture with ID "${id}" not found.`);
    }

    if (updateCultureDto.name) {
      const normalizedName = updateCultureDto.name.trim().toLowerCase();
      const existingCulture = await this.cultureRepository.findOneBy({
        name: normalizedName,
      });

      if (existingCulture && existingCulture.id !== id) {
        throw new ConflictException(
          `Culture with name "${updateCultureDto.name}" already exists.`,
        );
      }
      culture.name = normalizedName;
    }

    return this.cultureRepository.save(culture);
  }

  async remove(id: string): Promise<void> {
    const result = await this.cultureRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Culture with ID "${id}" not found.`);
    }
  }
}
