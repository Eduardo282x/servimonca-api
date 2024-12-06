import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MaintenanceController],
  providers: [MaintenanceService, PrismaService]
})
export class MaintenanceModule {}
