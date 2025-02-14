import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EquipmentService } from 'src/equipment/equipment.service';
import { MaintenanceService } from 'src/maintenance/maintenance.service';
import { RentalService } from 'src/rental/rental.service';

@Module({
    controllers: [ReportController],
    providers: [
        ReportService, 
        PrismaService,
        EquipmentService,
        RentalService,
        MaintenanceService
    ]
})
export class ReportModule { }


