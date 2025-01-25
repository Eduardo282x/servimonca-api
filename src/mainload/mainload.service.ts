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
                        rol: 'Administrador'
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

            const equipmentData = Array.from({ length: 10 }, (_, i) => ({
                model: `Equipo Modelo-${i + 1}`,
                serialNumber: `SN-${1000 + i}`,
                currentStatus: i % 2 === 0 ? 'Disponible' : 'En uso',
                placa: `Placa-${i + 1}`,
            }));
            await this.prismaService.equipment.createMany({ data: equipmentData });

            // Poblar tabla SparePart
            const sparePartData = Array.from({ length: 10 }, (_, i) => ({
                sparePart: `Repuesto-${i + 1}`,
                model: `Modelo-${i + 1}`,
                brand: `Marca-${i + 1}`,
                amount: 50 + i * 10,
                description: `Descripción del repuesto ${i + 1}`,
                status: i % 2 === 0 ? 'Pending' : 'Approved',
                criticAmount: 10,
            }));
            await this.prismaService.sparePart.createMany({ data: sparePartData });

            // Poblar tabla Clients
            const clientData = Array.from({ length: 10 }, (_, i) => ({
                name: `Cliente Nombre-${i + 1}`,
                lastname: `Apellido-${i + 1}`,
                rif: `J-${10000000 + i}`,
                phone: `041455500${i}`,
                email: `cliente${i + 1}@correo.com`,
                address: `Dirección del cliente ${i + 1}`,
            }));
            await this.prismaService.clients.createMany({ data: clientData });

            // Poblar tabla Payment
            const paymentData = Array.from({ length: 10 }, (_, i) => ({
                bank: `Banco-${i + 1}`,
                identify: `ID-${i + 1}`,
                email: `pago${i + 1}@correo.com`,
                phone: `0414555100${i}`,
                owner: `Propietario-${i + 1}`,
                type: i % 2 === 0 ? 'Efectivo' : 'Transferencia',
            }));
            await this.prismaService.payment.createMany({ data: paymentData });

            // Poblar tabla Rental
            const rentalData = Array.from({ length: 10 }, (_, i) => ({
                clientId: i + 1,
                equipmentId: i + 1,
                rentalStartDate: new Date(),
                rentalEndDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                totalCost: 5000 + i * 500,
                paymentId: i + 1,
                description: null,
                status: i % 2 === 0 ? 'Solicitado' : 'Entregado',
            }));
            await this.prismaService.rental.createMany({ data: rentalData });

            // Poblar tabla Maintenance
            const maintenanceSpareData = Array.from({ length: 10 }, (_, i) => ({
                sparePartId: i + 1,
                amount: 20,
                status: i % 2 === 0 ? 'Solicitado' : 'Aprobado',
            }));

            await this.prismaService.maintenanceSparePart.createMany({ data: maintenanceSpareData });

            // Poblar tabla Maintenance
            const maintenanceData = Array.from({ length: 10 }, (_, i) => ({
                equipmentId: i + 1,
                status: i % 2 === 0 ? 'Pendiente' : 'Procesando',
                type: i % 2 === 0 ? 'Preventivo' : 'Correctivo',
                clientId: i % 2 === 0 ? null : 2,
                description: `Descripción del mantenimiento ${i + 1}`,
                maintenanceDate: new Date(),
            }));
            await this.prismaService.maintenance.createMany({ data: maintenanceData });

            baseResponse.message = 'Data cargada exitosamente';
            return baseResponse
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }
}
