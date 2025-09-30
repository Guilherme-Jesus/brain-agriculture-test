import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../farms/entities/farm.entity';
import { PlantedCrop } from '../planted-crops/entities/planted-crop.entity';
import {
  DashboardResponseDto,
  FarmsByCultureDto,
  FarmsByStateDto,
  LandUseDto,
} from './dto/dashboard-response.dto';

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
      .getRawOne<DashboardResponseDto>();

    // 2. Gráfico de Pizza por Estado
    const farmsByState = await this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(*)', 'count')
      .groupBy('farm.state')
      .getRawMany<FarmsByStateDto>();

    // 3. Gráfico de Pizza por Cultura
    // Conforme documentação: innerJoin para fazer join com relações
    const farmsByCulture = await this.plantedCropRepository
      .createQueryBuilder('plantedCrop')
      .innerJoin('plantedCrop.culture', 'culture')
      .innerJoin('plantedCrop.farm', 'farm')
      .select('culture.name', 'culture')
      .addSelect('COUNT(DISTINCT farm.id)', 'count')
      .groupBy('culture.name')
      .getRawMany<FarmsByCultureDto>();

    // 4. Gráfico de Pizza por Uso de Solo
    const landUse = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.arableArea)', 'totalArableArea')
      .addSelect('SUM(farm.vegetationArea)', 'totalVegetationArea')
      .getRawOne<LandUseDto>();

    // Validações para evitar erros de null/undefined
    if (!farmStats || !landUse) {
      throw new Error('Erro ao buscar dados do dashboard');
    }

    // Monta o objeto de resposta final
    // TypeORM retorna COUNT() e SUM() como strings, então precisamos converter para números
    return {
      totalFarms: parseInt(farmStats.totalFarms as unknown as string, 10),
      totalAreaInHectares: parseFloat(
        farmStats.totalAreaInHectares as unknown as string,
      ),
      farmsByState: farmsByState.map((item) => ({
        state: item.state,
        count: parseInt(item.count as unknown as string, 10),
      })),
      farmsByCulture: farmsByCulture.map((item) => ({
        culture: item.culture,
        count: parseInt(item.count as unknown as string, 10),
      })),
      landUse: {
        totalArableArea: parseFloat(
          landUse.totalArableArea as unknown as string,
        ),
        totalVegetationArea: parseFloat(
          landUse.totalVegetationArea as unknown as string,
        ),
      },
    };
  }
}
