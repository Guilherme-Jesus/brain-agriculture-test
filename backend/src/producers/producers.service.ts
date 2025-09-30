import { Injectable, NotFoundException } from '@nestjs/common';
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
    const producer = this.producerRepository.create(createProducerDto);
    return this.producerRepository.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return this.producerRepository.find();
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findOneBy({ id });
    if (!producer) {
      throw new NotFoundException(`Producer with ID "${id}" not found`);
    }
    return producer;
  }

  async remove(id: string): Promise<void> {
    const result = await this.producerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producer with ID "${id}" not found`);
    }
  }

  update(id: string, updateProducerDto: UpdateProducerDto) {
    return `This action updates a #${id} producer`;
  }
}
