import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from '@prisma/client';
import { DtoCustomer, DtoUpdateCustomer } from 'src/dtos/customer.dto';

@Controller('customer')
export class CustomerController {

    constructor(private customerService: CustomerService) { }

    @Get()
    async getAllCustomers(): Promise<Customer[]> {
        return await this.customerService.getCustomers();
    }

    @Post()
    async createCustomer(@Body() newCustomer: DtoCustomer) {
        return await this.customerService.createCustomer(newCustomer);
    }

    @Put()
    async updateCustomer(@Body() customer: DtoUpdateCustomer) {
        return await this.customerService.updateCustomer(customer);
    }

    @Delete('/:id')
    async deleteCustomer(@Param('id') id: number) {
        return await this.customerService.deleteCustomer(id);
    }
}
