import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from 'src/farms/entities/farm.entity';
import { PlantedCrop } from 'src/planted-crops/entities/planted-crop.entity';
import { Repository } from 'typeorm';

interface FarmStatsRaw {
  totalFarms: string;
  totalAreaInHectares: string;
}

interface FarmsByStateRaw {
  state: string;
  count: string;
}

interface FarmsByCultureRaw {
  culture: string;
  count: string;
}

interface LandUseRaw {
  totalArableArea: string;
  totalVegetationArea: string;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(PlantedCrop)
    private readonly plantedCropRepository: Repository<PlantedCrop>,
  ) {}

  async getDashboardData() {
    // 1. Total de fazendas e de hectares
    const farmStats = await this.farmRepository
      .createQueryBuilder('farm')
      .select('COUNT(farm.id)', 'totalFarms')
      .addSelect('SUM(farm.totalArea)', 'totalAreaInHectares')
      .getRawOne<FarmStatsRaw>();

    // 2. Gráfico de Pizza por Estado
    const farmsByState = await this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(*)', 'count')
      .groupBy('farm.state')
      .getRawMany<FarmsByStateRaw>();

    // 3. Gráfico de Pizza por Cultura
    // Conforme documentação: innerJoin para fazer join com relações
    const farmsByCulture = await this.plantedCropRepository
      .createQueryBuilder('plantedCrop')
      .innerJoin('plantedCrop.culture', 'culture')
      .innerJoin('plantedCrop.farm', 'farm')
      .select('culture.name', 'culture')
      .addSelect('COUNT(DISTINCT farm.id)', 'count')
      .groupBy('culture.name')
      .getRawMany<FarmsByCultureRaw>();

    // 4. Gráfico de Pizza por Uso de Solo
    const landUse = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.arableArea)', 'totalArableArea')
      .addSelect('SUM(farm.vegetationArea)', 'totalVegetationArea')
      .getRawOne<LandUseRaw>();

    // Validações para evitar erros de null/undefined
    if (!farmStats || !landUse) {
      throw new Error('Erro ao buscar dados do dashboard');
    }

    // Monta o objeto de resposta final
    return {
      totalFarms: parseInt(farmStats.totalFarms, 10),
      totalAreaInHectares: parseFloat(farmStats.totalAreaInHectares),
      farmsByState: farmsByState.map((item) => ({
        state: item.state,
        count: parseInt(item.count, 10),
      })),
      farmsByCulture: farmsByCulture.map((item) => ({
        culture: item.culture,
        count: parseInt(item.count, 10),
      })),
      landUse: {
        totalArableArea: parseFloat(landUse.totalArableArea),
        totalVegetationArea: parseFloat(landUse.totalVegetationArea),
      },
    };
  }
}
