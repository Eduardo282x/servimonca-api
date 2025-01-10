import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { DtoBaseResponse, baseResponse } from 'src/dtos/base.dto';
import { DtoCustomer, DtoUpdateCustomer } from 'src/dtos/customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
    
    constructor(private prismaService: PrismaService) {}

    async getCustomers():Promise<Customer[]>{
        return await this.prismaService.customer.findMany({
            orderBy: {
                id: 'asc'
            }
        });
    }

        async createCustomer(newCostumer: DtoCustomer): Promise<DtoBaseResponse> {
            try {
                await this.prismaService.customer.create({
                    data: {
                        customerName: newCostumer.customerName,
                        customerLastname: newCostumer.customerLastname,
                        customerEmail: newCostumer.customerEmail,
                        customerAddress: newCostumer.customerAddress
                    },
                });
                baseResponse.message = 'Cliente creado exitosamente';
                return baseResponse;
            } catch (err) {
                baseResponse.message += err.message;
                return baseResponse;
            }
        }
    
        async updateCustomer(customer: DtoUpdateCustomer): Promise<DtoBaseResponse> {
            try {
                await this.prismaService.customer.update({
                    data: {
                        customerName: customer.customerName,
                        customerLastname: customer.customerLastname,
                        customerEmail: customer.customerEmail,
                        customerAddress: customer.customerAddress
                    },
                    where: {
                        id: customer.id
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
                await this.prismaService.customer.delete({
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
