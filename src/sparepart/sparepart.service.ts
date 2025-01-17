import { Injectable } from '@nestjs/common';
import { SparePart } from '@prisma/client';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { DtoSparePart, DtoUpdateSparePart, DtoUpdateStatusSparePart } from 'src/dtos/spare-part.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export type statusSparePart = 'Approved' | 'Deny' | 'Pending'

@Injectable()
export class SparepartService {

    constructor(private prismaService: PrismaService) { }

    async getSpareparts(status: statusSparePart): Promise<SparePart[]> {
        return this.prismaService.sparePart.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                status: status
            }
        });
    }

    async createSpareParts(sparePart: DtoUpdateSparePart): Promise<DtoBaseResponse> {
        try {
            let findSparePart = null;
            if (sparePart.id) {
                findSparePart = await this.prismaService.sparePart.findFirst({
                    where: {
                        id: sparePart.id
                    }
                })
            }

            await this.prismaService.sparePart.create({
                data: {
                    sparePart: findSparePart ? findSparePart.sparePart : sparePart.sparePart,
                    model: findSparePart ? findSparePart.model : sparePart.model,
                    brand: findSparePart ? findSparePart.brand : sparePart.brand,
                    amount: sparePart.amount,
                    description: findSparePart ? findSparePart.description : sparePart.description,
                    criticAmount: findSparePart ? findSparePart.criticAmount : sparePart.criticAmount,
                    status: 'Pending'
                },
            });
            baseResponse.message = 'Repuesto agregado exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }

    async updateSpareParts(sparePart: DtoUpdateSparePart): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sparePart.update({
                data: {
                    sparePart: sparePart.sparePart,
                    model: sparePart.model,
                    brand: sparePart.brand,
                    amount: sparePart.amount,
                    description: sparePart.description,
                    criticAmount: sparePart.criticAmount
                },
                where: {
                    id: sparePart.id
                }
            });
            baseResponse.message = 'Repuesto actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }

    async updateSparePartsStatus(sparePart: DtoUpdateStatusSparePart): Promise<DtoBaseResponse> {
        try {
            const currentSparePart = await this.prismaService.sparePart.findFirst({
                where: { id: sparePart.id },
            });
        
            if (!currentSparePart) {
                throw new Error(`No se encontró el repuesto con ID: ${sparePart.id}`);
            }
        
            // Validar si existe un duplicado basado en el nombre del repuesto
            const duplicateSparePart = await this.prismaService.sparePart.findFirst({
                where: { sparePart: currentSparePart.sparePart, id: { not: sparePart.id } },
            });
        
            if (duplicateSparePart && sparePart.status === 'Approved') {
                // Sumar las cantidades y actualizar el registro existente
                await this.prismaService.sparePart.update({
                    data: {
                        status: sparePart.status,
                        amount: duplicateSparePart.amount + currentSparePart.amount,
                    },
                    where: { id: duplicateSparePart.id },
                });
        
                // Eliminar el registro duplicado
                await this.prismaService.sparePart.delete({
                    where: { id: sparePart.id },
                });
            } else {
                // Si no existe duplicado, solo actualiza el estado del repuesto actual
                await this.prismaService.sparePart.update({
                    data: { status: sparePart.status },
                    where: { id: sparePart.id },
                });
            }
            baseResponse.message = 'Estado de la orden actualizado.';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }

    async deleteSpareParts(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.sparePart.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Equipo eliminado exitosamente';
            return baseResponse;
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }
}
