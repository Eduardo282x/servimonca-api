import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { WorkOrder } from '@prisma/client';
import { DtoWorkOrder, DtoUpdateWorkOrder } from 'src/dtos/workOrder.dto';

@Controller('work-order')
export class WorkOrderController {

    constructor(private workOrderService: WorkOrderService) {

    }

    @Get()
    async getWorkOrders(): Promise<WorkOrder[]> {
        return await this.workOrderService.getAllWorkOrders();
    }

    @Post()
    async createWorkOrder(@Body() newWorkOrder: DtoWorkOrder) {
        return await this.workOrderService.createWorkOrder(newWorkOrder);
    }

    @Put()
    async updateWorkOrder(@Body() workOrder: DtoUpdateWorkOrder) {
        return await this.workOrderService.updateWorkOrder(workOrder);
    }

    @Delete('/:id')
    async deleteWorkOrder(@Param(':id') id: number) {
        return await this.workOrderService.deleteWorkOrder(id);
    }
}
