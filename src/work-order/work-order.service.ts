import { Injectable } from '@nestjs/common';
import { WorkOrder } from '@prisma/client';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { DtoUpdateWorkOrder, DtoWorkOrder } from 'src/dtos/workOrder.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkOrderService {

    constructor(private prismaService: PrismaService) { }

    async getAllWorkOrders(): Promise<WorkOrder[]> {
        return await this.prismaService.workOrder.findMany({
            orderBy: {
                id: 'asc'
            }
        });
    }

    async createWorkOrder(newWorkOrder: DtoWorkOrder): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.workOrder.create({
                data: {
                    equipmentId: newWorkOrder.equipmentId,
                    workOrderDate: newWorkOrder.workOrderDate,
                    description: newWorkOrder.description,
                    workOrderStatus: newWorkOrder.workOrderStatus,
                },
            });
            baseResponse.message = 'Orden creada exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }

    async updateWorkOrder(workOrder: DtoUpdateWorkOrder): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.workOrder.update({
                data: {
                    equipmentId: workOrder.equipmentId,
                    workOrderDate: workOrder.workOrderDate,
                    description: workOrder.description,
                    workOrderStatus: workOrder.workOrderStatus,
                },
                where: {
                    id: workOrder.id
                }
            });
            baseResponse.message = 'Orden actualizada exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }

    async deleteWorkOrder(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.workOrder.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Orden eliminada exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }
}
