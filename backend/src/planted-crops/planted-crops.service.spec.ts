import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mocked, TestBed } from '@suites/unit';
import { Culture } from 'src/cultures/entities/culture.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Harvest } from 'src/harvests/entities/harvest.entity';
import { Repository } from 'typeorm';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';
import { PlantedCrop } from './entities/planted-crop.entity';
import { PlantedCropsService } from './planted-crops.service';

describe('PlantedCropsService (com Suites)', () => {
  let service: PlantedCropsService;
  let plantedCropRepository: Mocked<Repository<PlantedCrop>>;
  let farmRepository: Mocked<Repository<Farm>>;
  let cultureRepository: Mocked<Repository<Culture>>;
  let harvestRepository: Mocked<Repository<Harvest>>;

  // --- Mock de Dados ---
  const mockFarm = { id: 'farm-uuid', arableArea: 500 } as Farm;
  const mockCulture = { id: 'culture-uuid', name: 'Soja' } as Culture;
  const mockHarvest = { id: 'harvest-uuid', name: 'Safra 2025' } as Harvest;
  const mockPlantedCrop = {
    id: 'planted-crop-uuid',
    plantedArea: 200,
    farm: mockFarm,
    culture: mockCulture,
    harvest: mockHarvest,
  } as PlantedCrop;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(PlantedCropsService).compile();

    service = unit;

    plantedCropRepository = unitRef.get(
      getRepositoryToken(PlantedCrop) as unknown as string,
    );
    farmRepository = unitRef.get(getRepositoryToken(Farm) as unknown as string);
    cultureRepository = unitRef.get(
      getRepositoryToken(Culture) as unknown as string,
    );
    harvestRepository = unitRef.get(
      getRepositoryToken(Harvest) as unknown as string,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Testes para o método CREATE ---
  describe('create', () => {
    const createDto: CreatePlantedCropDto = {
      farmId: mockFarm.id,
      cultureId: mockCulture.id,
      harvestId: mockHarvest.id,
      plantedArea: 200,
    };

    it('deve registrar uma cultura plantada com sucesso', async () => {
      // Arrange
      farmRepository.findOneBy.mockResolvedValue(mockFarm);
      cultureRepository.findOneBy.mockResolvedValue(mockCulture);
      harvestRepository.findOneBy.mockResolvedValue(mockHarvest);
      plantedCropRepository.find.mockResolvedValue([]);
      plantedCropRepository.create.mockReturnValue(mockPlantedCrop);
      plantedCropRepository.save.mockResolvedValue(mockPlantedCrop);

      // Act
      const result = await service.create(createDto);

      // Assert
      expect(result).toEqual(mockPlantedCrop);
      expect(farmRepository.findOneBy).toHaveBeenCalledWith({
        id: mockFarm.id,
      });
      expect(plantedCropRepository.save).toHaveBeenCalledWith(mockPlantedCrop);
    });

    it('deve lançar NotFoundException se a fazenda não for encontrada', async () => {
      farmRepository.findOneBy.mockResolvedValue(null);
      await expect(service.create(createDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar BadRequestException se a área plantada exceder a área agricultável', async () => {
      // Arrange
      farmRepository.findOneBy.mockResolvedValue(mockFarm);
      cultureRepository.findOneBy.mockResolvedValue(mockCulture);
      harvestRepository.findOneBy.mockResolvedValue(mockHarvest);

      // Simula que já existem 400 hectares plantados na fazenda
      const existingCrops = [{ plantedArea: 400 }] as PlantedCrop[];
      plantedCropRepository.find.mockResolvedValue(existingCrops);

      // Tenta adicionar mais 200 (400 + 200 > 500)
      const dtoWithExcessArea = { ...createDto, plantedArea: 400 };

      // Act & Assert
      await expect(service.create(dtoWithExcessArea)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar um array de culturas plantadas', async () => {
      plantedCropRepository.find.mockResolvedValue([mockPlantedCrop]);
      const result = await service.findAll();
      expect(result).toEqual([mockPlantedCrop]);
    });
  });

  describe('findOne', () => {
    it('deve retornar um registro de cultura plantada pelo ID', async () => {
      plantedCropRepository.findOne.mockResolvedValue(mockPlantedCrop);
      const result = await service.findOne('some-uuid');
      expect(result).toEqual(mockPlantedCrop);
    });

    it('deve lançar NotFoundException se o registro não for encontrado', async () => {
      plantedCropRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('some-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('deve remover um registro com sucesso', async () => {
      plantedCropRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
      await expect(service.remove('some-uuid')).resolves.toBeUndefined();
    });

    it('deve lançar NotFoundException se o registro a ser removido não for encontrado', async () => {
      plantedCropRepository.delete.mockResolvedValue({ affected: 0, raw: [] });
      await expect(service.remove('some-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
