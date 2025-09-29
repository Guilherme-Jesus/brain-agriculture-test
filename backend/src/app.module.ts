import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducersModule } from './producers/producers.module';

@Module({
  imports: [ProducersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
