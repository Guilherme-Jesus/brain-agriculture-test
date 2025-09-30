import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturesController } from './cultures.controller';
import { CulturesService } from './cultures.service';
import { Culture } from './entities/culture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Culture])],
  controllers: [CulturesController],
  providers: [CulturesService],
})
export class CulturesModule {}
