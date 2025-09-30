import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna os dados consolidados para o dashboard' })
  @ApiOkResponse({
    description: 'Dados do dashboard retornados com sucesso.',
    type: DashboardResponseDto,
  })
  getDashboardData() {
    return this.dashboardService.getDashboardData();
  }
}
