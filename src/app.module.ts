import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { MainloadModule } from './mainload/mainload.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { SparepartModule } from './sparepart/sparepart.module';
import { SparepartHistoryModule } from './sparepart-history/sparepart-history.module';
import { CustomerModule } from './customer/customer.module';
import { RentalModule } from './rental/rental.module';
import { WorkOrderModule } from './work-order/work-order.module';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, MainloadModule, EquipmentModule, MaintenanceModule, SparepartModule, SparepartHistoryModule, CustomerModule, RentalModule, WorkOrderModule, ReportModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
