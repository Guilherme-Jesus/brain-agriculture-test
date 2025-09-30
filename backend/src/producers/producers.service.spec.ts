import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mocked, TestBed } from '@suites/unit';
import { Farm } from 'src/farms/entities/farm.entity';
import { Repository } from 'typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { Producer } from './entities/producer.entity';
import { ProducersService } from './producers.service';

describe('ProducersService (com Suites)', () => {
  let service: ProducersService;
  let producerRepository: Mocked<Repository<Producer>>;

  const mockFarm = { id: 'uuid-farm-1', name: 'Fazenda Mock' } as Farm;
  const mockProducerEntity = {
    id: 'uuid-producer-1',
    document: '11122233344',
    producerName: 'Produtor Teste',
    farms: [],
  } as Producer;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(ProducersService).compile();

    service = unit;
    producerRepository = unitRef.get(
      getRepositoryToken(Producer) as unknown as string,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um produtor com sucesso', async () => {
      const createDto: CreateProducerDto = {
        document: '11122233344',
        producerName: 'Produtor Teste',
      };
      producerRepository.create.mockReturnValue(mockProducerEntity);
      producerRepository.save.mockResolvedValue(mockProducerEntity);

      const result = await service.create(createDto);

      expect(result).toEqual(mockProducerEntity);
      expect(producerRepository.save).toHaveBeenCalledWith(mockProducerEntity);
    });
  });

  describe('findAll', () => {
    it('deve retornar um array de produtores', async () => {
      producerRepository.find.mockResolvedValue([mockProducerEntity]);
      const result = await service.findAll();
      expect(result).toEqual([mockProducerEntity]);
    });
  });

  describe('findOne', () => {
    it('deve retornar um produtor pelo ID', async () => {
      producerRepository.findOneBy.mockResolvedValue(mockProducerEntity);
      const result = await service.findOne('uuid-producer-1');
      expect(result).toEqual(mockProducerEntity);
    });
  });

  describe('findWithFarms', () => {
    it('deve retornar um produtor com suas fazendas', async () => {
      const producerWithFarms = { ...mockProducerEntity, farms: [mockFarm] };
      producerRepository.findOne.mockResolvedValue(producerWithFarms);

      const result = await service.findWithFarms('uuid-producer-1');

      expect(result).toEqual(producerWithFarms);
      expect(result.farms).toHaveLength(1);
      expect(result.farms[0].name).toEqual('Fazenda Mock');
      expect(producerRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'uuid-producer-1' },
        relations: ['farms'],
      });
    });

    it('deve lançar NotFoundException se o produtor não for encontrado', async () => {
      producerRepository.findOne.mockResolvedValue(null);
      await expect(service.findWithFarms('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('deve remover um produtor com sucesso', async () => {
      producerRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
      await expect(service.remove('uuid-producer-1')).resolves.toBeUndefined();
    });

    it('deve lançar NotFoundException se o produtor a ser removido não for encontrado', async () => {
      producerRepository.delete.mockResolvedValue({ affected: 0, raw: [] });
      await expect(service.remove('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
