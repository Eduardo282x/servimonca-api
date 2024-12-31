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

            await this.prismaService.statusEquipment.createMany({
                data: [
                    {
                        status: 'Disponible'
                    },
                    {
                        status: 'En uso'
                    },
                    {
                        status: 'En mantenimiento'
                    },
                    {
                        status: 'Dañado'
                    }
                ]
            });

            await this.prismaService.equipment.createMany({
                data: [
                    {
                        model: 'Model A',
                        brand: 'Brand X',
                        yearManufactured: 2020,
                        serialNumber: 'SN12345',
                        loadCapacity: 5000.0,
                        dimensions: '5x2x3',
                        currentStatusId: 1,
                    },
                    {
                        model: 'Model B',
                        brand: 'Brand Y',
                        yearManufactured: 2021,
                        serialNumber: 'SN67890',
                        loadCapacity: 7000.0,
                        dimensions: '6x3x4',
                        currentStatusId: 2,
                    },
                ],
            });

            // Seeding SparePart
            await this.prismaService.sparePart.createMany({
                data: [
                    {
                        sparePartName: 'Hydraulic Pump',
                        description: 'Essential for lifting operations',
                        currentStock: 15,
                        minimumStock: 5,
                        maximumStock: 50,
                    },
                    {
                        sparePartName: 'Brake Pads',
                        description: 'High-performance brake pads',
                        currentStock: 50,
                        minimumStock: 10,
                        maximumStock: 200,
                    },
                ],
            });

            // Seeding Customers
            await this.prismaService.customer.createMany({
                data: [
                    {
                        customerName: 'John',
                        customerLastname: 'Doe',
                        customerEmail: 'johndoe@example.com',
                        customerAddress: '123 Main St, Cityville',
                    },
                    {
                        customerName: 'Jane',
                        customerLastname: 'Smith',
                        customerEmail: 'janesmith@example.com',
                        customerAddress: '456 Elm St, Townsville',
                    },
                ],
            });

            await this.prismaService.typePayment.createMany({
                data: [
                    {
                        typePayment: 'Transferencia'
                    },
                    {
                        typePayment: 'Pago móvil'
                    },
                    {
                        typePayment: 'Zelle'
                    }
                ]
            })

            await this.prismaService.payment.createMany({
                data: [
                    {
                        typeId: 2,
                        bank: 'BNC',
                        identify: '28391325',
                        email: '',
                        phone: '04165610813',
                        owner: 'Eduardo Rojas'
                    },
                    {
                        typeId: 3,
                        bank: 'Zelle',
                        identify: '28391325',
                        email: 'eduardorojas@gmail.com',
                        phone: '',
                        owner: 'Eduardo Rojas'
                    },
                ]
            })

            // Seeding Rentals
            await this.prismaService.rental.createMany({
                data: [
                    {
                        customerId: 1, // Ensure these IDs correspond to seeded customers
                        equipmentId: 1, // Ensure these IDs correspond to seeded equipment
                        rentalStartDate: new Date('2024-01-01'),
                        rentalEndDate: new Date('2024-01-10'),
                        rentalRate: 100.0,
                        totalCost: 1000.0,
                        paymentId: 1
                    },
                    {
                        customerId: 2,
                        equipmentId: 2,
                        rentalStartDate: new Date('2024-02-01'),
                        rentalEndDate: new Date('2024-02-15'),
                        rentalRate: 150.0,
                        totalCost: 2250.0,
                        paymentId: 2
                    },
                ],
            });

            // Seeding Maintenance
            await this.prismaService.maintenance.createMany({
                data: [
                    {
                        equipmentId: 1,
                        maintenanceType: 'preventive',
                        maintenanceDate: new Date('2024-03-01'),
                        description: 'Oil change and general inspection',
                    },
                    {
                        equipmentId: 2,
                        maintenanceType: 'corrective',
                        maintenanceDate: new Date('2024-04-01'),
                        description: 'Replaced hydraulic pump',
                    },
                ],
            });

            // Seeding WorkOrders
            await this.prismaService.workOrder.createMany({
                data: [
                    {
                        equipmentId: 1,
                        workOrderDate: new Date('2024-05-01'),
                        description: 'Fixing steering issues',
                        workOrderStatus: 'pending',
                    },
                    {
                        equipmentId: 2,
                        workOrderDate: new Date('2024-06-01'),
                        description: 'Replacing brake pads',
                        workOrderStatus: 'completed',
                    },
                ],
            });

            // Seeding Reports
            await this.prismaService.report.createMany({
                data: [
                    {
                        reportType: 'inventory',
                        description: 'Monthly stock overview',
                        reportDate: new Date('2024-07-01'),
                        reportData: { totalItems: 200 },
                    },
                    {
                        reportType: 'maintenance',
                        description: 'Summary of maintenance activities',
                        reportDate: new Date('2024-08-01'),
                        reportData: { totalMaintenances: 10 },
                    },
                ],
            });

            baseResponse.message = 'Data cargada exitosamente';
            return baseResponse
        } catch (err) {
            badResponse.message += err.message;
            return badResponse;
        }
    }
}
