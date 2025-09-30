import { getRepositoryToken } from '@nestjs/typeorm';
import { Mocked, TestBed } from '@suites/unit';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Farm } from '../farms/entities/farm.entity';
import { PlantedCrop } from '../planted-crops/entities/planted-crop.entity';
import { DashboardService } from './dashboard.service';

const mockFarmStatsRaw = {
  totalFarms: '3',
  totalAreaInHectares: '650.50',
};
const mockFarmsByStateRaw = [
  { state: 'MG', count: '2' },
  { state: 'SP', count: '1' },
];
const mockFarmsByCultureRaw = [
  { culture: 'Soja', count: '2' },
  { culture: 'Milho', count: '2' },
];
const mockLandUseRaw = {
  totalArableArea: '320.00',
  totalVegetationArea: '180.50',
};

describe('DashboardService (com Suites)', () => {
  let service: DashboardService;
  let farmRepository: Mocked<Repository<Farm>>;
  let plantedCropRepository: Mocked<Repository<PlantedCrop>>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(DashboardService).compile();

    service = unit;

    farmRepository = unitRef.get(getRepositoryToken(Farm) as unknown as string);
    plantedCropRepository = unitRef.get(
      getRepositoryToken(PlantedCrop) as unknown as string,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardData', () => {
    it('deve calcular e retornar os dados do dashboard corretamente', async () => {
      const mockFarmQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawOne: jest
          .fn()
          .mockResolvedValueOnce(mockFarmStatsRaw)
          .mockResolvedValueOnce(mockLandUseRaw),
        getRawMany: jest.fn().mockResolvedValue(mockFarmsByStateRaw),
      };

      const mockPlantedCropQueryBuilder = {
        innerJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockFarmsByCultureRaw),
      };

      farmRepository.createQueryBuilder.mockReturnValue(
        mockFarmQueryBuilder as unknown as SelectQueryBuilder<Farm>,
      );
      plantedCropRepository.createQueryBuilder.mockReturnValue(
        mockPlantedCropQueryBuilder as unknown as SelectQueryBuilder<PlantedCrop>,
      );

      const result = await service.getDashboardData();

      expect(result.totalFarms).toBe(3);
      expect(result.totalAreaInHectares).toBe(650.5);
      expect(result.farmsByState).toEqual([
        { state: 'MG', count: 2 },
        { state: 'SP', count: 1 },
      ]);
      expect(result.farmsByCulture).toEqual([
        { culture: 'Soja', count: 2 },
        { culture: 'Milho', count: 2 },
      ]);
      expect(result.landUse.totalArableArea).toBe(320.0);
      expect(result.landUse.totalVegetationArea).toBe(180.5);
    });
  });
});
