import { Module } from '@nestjs/common';
import { WorkOrderController } from './work-order.controller';
import { WorkOrderService } from './work-order.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorkOrderController],
  providers: [WorkOrderService, PrismaService]
})
export class WorkOrderModule { }
