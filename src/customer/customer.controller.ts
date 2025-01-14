import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Clients } from '@prisma/client';
import { DtoClients, DtoUpdateClients } from 'src/dtos/customer.dto';

@Controller('clients')
export class CustomerController {

    constructor(private customerService: CustomerService) { }

    @Get()
    async getAllCustomers(): Promise<Clients[]> {
        return await this.customerService.getCustomers();
    }

    @Post()
    async createCustomer(@Body() newClient: DtoClients) {
        return await this.customerService.createCustomer(newClient);
    }

    @Put()
    async updateCustomer(@Body() client: DtoUpdateClients) {
        return await this.customerService.updateCustomer(client);
    }

    @Delete('/:id')
    async deleteCustomer(@Param('id') id: number) {
        return await this.customerService.deleteCustomer(id);
    }
}
