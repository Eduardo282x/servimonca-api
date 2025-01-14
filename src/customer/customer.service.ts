import { Injectable } from '@nestjs/common';
import { Clients } from '@prisma/client';
import { DtoBaseResponse, baseResponse } from 'src/dtos/base.dto';
import { DtoClients, DtoUpdateClients } from 'src/dtos/customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {

    constructor(private prismaService: PrismaService) { }

    async getCustomers(): Promise<Clients[]> {
        return await this.prismaService.clients.findMany({
            orderBy: {
                id: 'asc'
            }
        });
    }

    async createCustomer(newClient: DtoClients): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.clients.create({
                data: {
                    name: newClient.name,
                    lastname: newClient.lastname,
                    rif: newClient.rif,
                    phone: newClient.phone,
                    email: newClient.email,
                    address: newClient.address,
                },
            });
            baseResponse.message = 'Cliente creado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async updateCustomer(client: DtoUpdateClients): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.clients.update({
                data: {
                    name: client.name,
                    lastname: client.lastname,
                    rif: client.rif,
                    phone: client.phone,
                    email: client.email,
                    address: client.address,
                },
                where: {
                    id: client.id
                }
            });
            baseResponse.message = 'Cliente actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async deleteCustomer(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.clients.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Cliente eliminado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }
}
