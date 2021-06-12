import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { Trainer } from 'src/database/entities/trainer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  providers: [TrainerService],
  controllers: [TrainerController]
})
export class TrainerModule {}
