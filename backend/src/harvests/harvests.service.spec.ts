import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mocked, TestBed } from '@suites/unit';
import { Repository } from 'typeorm';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Harvest } from './entities/harvest.entity';
import { HarvestsService } from './harvests.service';

describe('HarvestsService (com Suites)', () => {
  let service: HarvestsService;
  let harvestRepository: Mocked<Repository<Harvest>>;

  const mockHarvestEntity = {
    id: 'uuid-harvest-1',
    name: 'Safra 2024/2025',
  } as Harvest;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(HarvestsService).compile();

    service = unit;

    harvestRepository = unitRef.get(
      getRepositoryToken(Harvest) as unknown as string,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma safra com sucesso', async () => {
      const createDto: CreateHarvestDto = { name: 'Safra 2024/2025' };
      harvestRepository.findOneBy.mockResolvedValue(null);
      harvestRepository.create.mockReturnValue(mockHarvestEntity);
      harvestRepository.save.mockResolvedValue(mockHarvestEntity);

      const result = await service.create(createDto);

      expect(result).toEqual(mockHarvestEntity);
      expect(harvestRepository.save).toHaveBeenCalledWith(mockHarvestEntity);
    });

    it('deve lançar ConflictException se a safra já existir', async () => {
      const createDto: CreateHarvestDto = { name: 'Safra 2024/2025' };
      harvestRepository.findOneBy.mockResolvedValue(mockHarvestEntity);
      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar um array de safras', async () => {
      harvestRepository.find.mockResolvedValue([mockHarvestEntity]);
      const result = await service.findAll();
      expect(result).toEqual([mockHarvestEntity]);
    });
  });

  describe('findOne', () => {
    it('deve retornar uma safra pelo ID', async () => {
      harvestRepository.findOneBy.mockResolvedValue(mockHarvestEntity);
      const result = await service.findOne('uuid-harvest-1');
      expect(result).toEqual(mockHarvestEntity);
    });

    it('deve lançar NotFoundException se a safra não for encontrada', async () => {
      harvestRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar uma safra com sucesso', async () => {
      const updateDto: UpdateHarvestDto = { name: 'Safra 2025/2026' };
      const updatedHarvest = { ...mockHarvestEntity, ...updateDto };
      harvestRepository.preload.mockResolvedValue(updatedHarvest);
      harvestRepository.save.mockResolvedValue(updatedHarvest);

      const result = await service.update('uuid-harvest-1', updateDto);

      expect(result).toEqual(updatedHarvest);
    });

    it('deve lançar NotFoundException se a safra a ser atualizada não for encontrada', async () => {
      harvestRepository.preload.mockResolvedValue(undefined);
      await expect(service.update('uuid-invalido', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('deve remover uma safra com sucesso', async () => {
      harvestRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
      await expect(service.remove('uuid-harvest-1')).resolves.toBeUndefined();
    });

    it('deve lançar NotFoundException se a safra a ser removida não for encontrada', async () => {
      harvestRepository.delete.mockResolvedValue({ affected: 0, raw: [] });
      await expect(service.remove('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
