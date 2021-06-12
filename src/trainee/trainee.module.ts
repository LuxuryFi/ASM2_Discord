import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from 'src/database/entities/trainee.entity';
import { TraineeController } from './trainee.controller';
import { TraineeService } from './trainee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee])],

  controllers: [TraineeController],
  providers: [TraineeService]
})
export class TraineeModule {}
