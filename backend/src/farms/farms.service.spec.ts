import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mocked, TestBed } from '@suites/unit';
import { Producer } from 'src/producers/entities/producer.entity';
import { Repository } from 'typeorm';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { FarmsService } from './farms.service';

describe('FarmsService (com Suites)', () => {
  let service: FarmsService;
  let farmRepository: Mocked<Repository<Farm>>;
  let producerRepository: Mocked<Repository<Producer>>;

  const mockProducerEntity = { id: 'uuid-producer-1' } as Producer;

  const mockFarmEntity = {
    id: 'uuid-farm-1',
    name: 'Fazenda Teste',
    city: 'Cidade Teste',
    state: 'TS',
    totalArea: 100,
    arableArea: 50,
    vegetationArea: 25,
    producer: mockProducerEntity,
  } as Farm;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(FarmsService).compile();

    service = unit;

    farmRepository = unitRef.get(getRepositoryToken(Farm) as unknown as string);
    producerRepository = unitRef.get(
      getRepositoryToken(Producer) as unknown as string,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma fazenda com sucesso', async () => {
      const createDto: CreateFarmDto = {
        name: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'TS',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        producerId: 'uuid-producer-1',
      };
      producerRepository.findOneBy.mockResolvedValue(mockProducerEntity);
      farmRepository.create.mockReturnValue(mockFarmEntity);
      farmRepository.save.mockResolvedValue(mockFarmEntity);

      const result = await service.create(createDto);

      expect(result).toEqual(mockFarmEntity);
      expect(producerRepository.findOneBy).toHaveBeenCalledWith({
        id: createDto.producerId,
      });
      expect(farmRepository.save).toHaveBeenCalledWith(mockFarmEntity);
    });

    it('deve lançar BadRequestException se a soma das áreas for inválida', async () => {
      const createDto: CreateFarmDto = {
        name: 'Fazenda Invalida',
        city: 'Cidade',
        state: 'TS',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 100,
        producerId: 'uuid-producer-1',
      };
      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('deve lançar NotFoundException se o produtor não existir', async () => {
      const createDto: CreateFarmDto = {
        name: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'TS',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 25,
        producerId: 'uuid-producer-1',
      } as CreateFarmDto;
      producerRepository.findOneBy.mockResolvedValue(null);
      await expect(service.create(createDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar um array de fazendas', async () => {
      farmRepository.find.mockResolvedValue([mockFarmEntity]);
      const result = await service.findAll();
      expect(result).toEqual([mockFarmEntity]);
      expect(farmRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar uma fazenda com sucesso', async () => {
      farmRepository.findOne.mockResolvedValue(mockFarmEntity);
      const result = await service.findOne('uuid-farm-1');
      expect(result).toEqual(mockFarmEntity);
    });

    it('deve lançar NotFoundException se a fazenda não for encontrada', async () => {
      farmRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar uma fazenda com sucesso', async () => {
      const updateDto: UpdateFarmDto = { name: 'Fazenda Atualizada' };
      const updatedFarm = { ...mockFarmEntity, ...updateDto };
      farmRepository.preload.mockResolvedValue(updatedFarm);
      farmRepository.save.mockResolvedValue(updatedFarm);
      farmRepository.findOne.mockResolvedValue(updatedFarm);

      const result = await service.update('uuid-farm-1', updateDto);

      expect(result).toEqual(updatedFarm);
    });
  });

  describe('remove', () => {
    it('deve remover uma fazenda com sucesso', async () => {
      farmRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
      await expect(service.remove('uuid-farm-1')).resolves.toBeUndefined();
    });

    it('deve lançar NotFoundException se a fazenda a ser removida não for encontrada', async () => {
      farmRepository.delete.mockResolvedValue({ affected: 0, raw: [] });
      await expect(service.remove('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
