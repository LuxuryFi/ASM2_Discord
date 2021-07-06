import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from 'src/database/entities/trainee.entity';
import { Trainer } from 'src/database/entities/trainer.entity';
import { Staff } from 'src/database/entities/staff.entity';
import { Admin } from 'src/database/entities/admin.entity';
import { TraineeService } from 'src/trainee/trainee.service';
import { TrainerService } from 'src/trainer/trainer.service';
import { StaffService } from 'src/staff/staff.service';
import { AdminService } from 'src/admin/admin.service';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Trainee,Trainer,Staff,Admin])],
  providers: [AuthService, LocalStrategy,TraineeService,TrainerService,StaffService,AdminService,SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
