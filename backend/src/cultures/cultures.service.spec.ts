import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mocked, TestBed } from '@suites/unit';
import { Repository } from 'typeorm';
import { CulturesService } from './cultures.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { Culture } from './entities/culture.entity';

describe('CulturesService (com Suites)', () => {
  let service: CulturesService;
  let cultureRepository: Mocked<Repository<Culture>>;

  const mockCultureEntity = {
    id: 'uuid-culture-1',
    name: 'Soja',
  } as Culture;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(CulturesService).compile();

    service = unit;
    cultureRepository = unitRef.get(
      getRepositoryToken(Culture) as unknown as string,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma cultura com sucesso', async () => {
      const createDto: CreateCultureDto = { name: 'Soja' };
      cultureRepository.findOneBy.mockResolvedValue(null);
      cultureRepository.create.mockReturnValue(mockCultureEntity);
      cultureRepository.save.mockResolvedValue(mockCultureEntity);

      const result = await service.create(createDto);

      expect(result).toEqual(mockCultureEntity);
      expect(cultureRepository.save).toHaveBeenCalledWith(mockCultureEntity);
    });

    it('deve lançar ConflictException se a cultura já existir', async () => {
      const createDto: CreateCultureDto = { name: 'Soja' };
      cultureRepository.findOneBy.mockResolvedValue(mockCultureEntity);
      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar um array de culturas', async () => {
      cultureRepository.find.mockResolvedValue([mockCultureEntity]);
      const result = await service.findAll();
      expect(result).toEqual([mockCultureEntity]);
    });
  });

  describe('findOne', () => {
    it('deve retornar uma cultura pelo ID', async () => {
      cultureRepository.findOneBy.mockResolvedValue(mockCultureEntity);
      const result = await service.findOne('uuid-culture-1');
      expect(result).toEqual(mockCultureEntity);
    });

    it('deve lançar NotFoundException se a cultura não for encontrada', async () => {
      cultureRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar uma cultura com sucesso', async () => {
      const updateDto: UpdateCultureDto = { name: 'Soja Orgânica' };
      const updatedCulture = { ...mockCultureEntity, ...updateDto };
      cultureRepository.preload.mockResolvedValue(updatedCulture);
      cultureRepository.save.mockResolvedValue(updatedCulture);

      const result = await service.update('uuid-culture-1', updateDto);

      expect(result).toEqual(updatedCulture);
    });
  });

  describe('remove', () => {
    it('deve remover uma cultura com sucesso', async () => {
      cultureRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
      await expect(service.remove('uuid-culture-1')).resolves.toBeUndefined();
    });

    it('deve lançar NotFoundException se a cultura a ser removida não for encontrada', async () => {
      cultureRepository.delete.mockResolvedValue({ affected: 0, raw: [] });
      await expect(service.remove('uuid-invalido')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
