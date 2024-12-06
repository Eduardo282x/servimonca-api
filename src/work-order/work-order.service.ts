import { Injectable } from '@nestjs/common';
import { WorkOrder } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkOrderService {

    constructor(private prismaService: PrismaService) {}

    async getAllWorkOrders(): Promise<WorkOrder[]> {
        return await this.prismaService.workOrder.findMany();
    }
}
