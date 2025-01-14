import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { MainloadModule } from './mainload/mainload.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { SparepartModule } from './sparepart/sparepart.module';
import { CustomerModule } from './customer/customer.module';
import { RentalModule } from './rental/rental.module';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, MainloadModule, EquipmentModule, MaintenanceModule, SparepartModule, CustomerModule, RentalModule, ReportModule, UserModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
