import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MainloadService {

    constructor(private prismaService: PrismaService) { }

    async generateData(): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.roles.createMany({
                data: [
                    {
                        rol: 'Administrador '
                    },
                    {
                        rol: 'Personal Administrativo'
                    },
                    {
                        rol: 'Almacén'
                    },
                    {
                        rol: 'Taller'
                    }
                ]
            })

            await this.prismaService.user.createMany({
                data: [
                    {
                        firstName: 'Eduardo',
                        lastName: 'Rojas',
                        username: 'admin',
                        password: 'admin',
                        identify: '28391325',
                        rolId: 1,
                        status: true
                    },
                    {
                        firstName: 'Luis',
                        lastName: 'Ugaz',
                        username: 'luisangel',
                        password: 'luisangel',
                        identify: '00000000',
                        rolId: 2,
                        status: true
                    }
                ]
            });

            const statusEquipmentData = [
                { status: 'Disponible' },
                { status: 'En alquiler' },
                { status: 'En mantenimiento' },
                { status: 'Reparación' },
                { status: 'No disponible' },
            ];
            await this.prismaService.statusEquipment.createMany({ data: statusEquipmentData });

            // Poblar tabla Equipment
            const equipmentData = Array.from({ length: 10 }, (_, i) => ({
                model: `Modelo-${i + 1}`,
                brand: `Marca-${i + 1}`,
                yearManufactured: 2015 + i,
                serialNumber: `SN-${1000 + i}`,
                loadCapacity: 1000 + i * 500,
                dimensions: `${i + 2}x${i + 3}x${i + 4}`,
                currentStatusId: 1,
            }));
            await this.prismaService.equipment.createMany({ data: equipmentData });

            // Poblar tabla Maintenance
            const maintenanceData = Array.from({ length: 10 }, (_, i) => ({
                maintenanceType: i % 2 === 0 ? 'Preventivo' : 'Correctivo',
                maintenanceDate: new Date(),
                description: `Descripción del mantenimiento ${i + 1}`,
                equipmentId: i + 1,
            }));
            await this.prismaService.maintenance.createMany({ data: maintenanceData });

            // Poblar tabla SparePart
            const sparePartData = Array.from({ length: 10 }, (_, i) => ({
                sparePartName: `Repuesto-${i + 1}`,
                description: `Descripción del repuesto ${i + 1}`,
                currentStock: 10 + i,
                minimumStock: 5,
                maximumStock: 20,
            }));
            await this.prismaService.sparePart.createMany({ data: sparePartData });

            // Poblar tabla SparePartHistory
            const sparePartHistoryData = Array.from({ length: 10 }, (_, i) => ({
                sparePartId: i + 1,
                operationType: i % 2 === 0 ? 'Entrada' : 'Salida',
                quantity: 5 + i,
                operationDate: new Date(),
                description: `Operación de repuesto ${i + 1}`,
            }));
            await this.prismaService.sparePartHistory.createMany({ data: sparePartHistoryData });

            // Poblar tabla Customer
            const customerData = Array.from({ length: 10 }, (_, i) => ({
                customerName: `Cliente-${i + 1}`,
                customerLastname: `Apellido-${i + 1}`,
                customerEmail: `cliente${i + 1}@correo.com`,
                customerAddress: `Dirección del cliente ${i + 1}`,
            }));
            await this.prismaService.customer.createMany({ data: customerData });

            // Poblar tabla TypePayment
            const typePaymentData = [
                { typePayment: 'Efectivo' },
                { typePayment: 'Transferencia bancaria' },
                { typePayment: 'Tarjeta de crédito' },
                { typePayment: 'PayPal' },
                { typePayment: 'Cheque' },
            ];
            await this.prismaService.typePayment.createMany({ data: typePaymentData });

            // Poblar tabla Payment
            const paymentData = Array.from({ length: 10 }, (_, i) => ({
                bank: `Banco-${i + 1}`,
                identify: `ID-${i + 1}`,
                email: `pago${i + 1}@correo.com`,
                phone: `0414-555-000${i}`,
                owner: `Propietario-${i + 1}`,
                typeId: 1,
            }));
            await this.prismaService.payment.createMany({ data: paymentData });

            // Poblar tabla Rental
            const rentalData = Array.from({ length: 10 }, (_, i) => ({
                customerId: i + 1,
                equipmentId: i + 1,
                rentalStartDate: new Date(),
                rentalEndDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                rentalRate: 1000 + i * 200,
                totalCost: 7000 + i * 200,
                paymentId: i + 1,
            }));
            await this.prismaService.rental.createMany({ data: rentalData });

            // Poblar tabla WorkOrder
            const workOrderData = Array.from({ length: 10 }, (_, i) => ({
                equipmentId: i + 1,
                workOrderDate: new Date(),
                description: `Orden de trabajo ${i + 1}`,
                workOrderStatus: i % 2 === 0 ? 'En progreso' : 'Completada',
            }));
            await this.prismaService.workOrder.createMany({ data: workOrderData });

            // Poblar tabla Report
            const reportData = Array.from({ length: 10 }, (_, i) => ({
                reportType: i % 2 === 0 ? 'Inventario' : 'Mantenimiento',
                description: `Reporte ${i + 1}`,
            }));
            await this.prismaService.report.createMany({ data: reportData });

            baseResponse.message = 'Data cargada exitosamente';
            return baseResponse
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }
}
