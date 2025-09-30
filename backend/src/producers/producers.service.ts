import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Producer } from './entities/producer.entity';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const existingProducerByDoc = await this.producerRepository.findOneBy({
      document: createProducerDto.document,
    });

    if (existingProducerByDoc) {
      throw new ConflictException(
        `Producer with document "${createProducerDto.document}" already exists.`,
      );
    }

    const producerData = {
      ...createProducerDto,
      producerName: createProducerDto.producerName.trim().toLowerCase(),
    };

    const producer = this.producerRepository.create(producerData);
    return this.producerRepository.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return this.producerRepository.find();
  }

  async findWithFarms(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findOne({
      where: { id },
      relations: ['farms'],
    });

    if (!producer) {
      throw new NotFoundException(`Producer with ID "${id}" not found`);
    }
    return producer;
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findOneBy({ id });
    if (!producer) {
      throw new NotFoundException(`Producer with ID "${id}" not found`);
    }
    return producer;
  }

  async update(
    id: string,
    updateProducerDto: UpdateProducerDto,
  ): Promise<Producer> {
    if (updateProducerDto.producerName) {
      updateProducerDto.producerName = updateProducerDto.producerName
        .trim()
        .toLowerCase();
    }

    if (updateProducerDto.document) {
      const existingProducerByDoc = await this.producerRepository.findOneBy({
        document: updateProducerDto.document,
      });
      if (existingProducerByDoc && existingProducerByDoc.id !== id) {
        throw new ConflictException(
          `Producer with document "${updateProducerDto.document}" already exists.`,
        );
      }
    }

    const producer = await this.producerRepository.preload({
      id,
      ...updateProducerDto,
    });

    if (!producer) {
      throw new NotFoundException(`Producer with ID "${id}" not found`);
    }

    return this.producerRepository.save(producer);
  }

  async remove(id: string): Promise<void> {
    const result = await this.producerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producer with ID "${id}" not found`);
    }
  }
}
