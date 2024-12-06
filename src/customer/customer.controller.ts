import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from '@prisma/client';

@Controller('customer')
export class CustomerController {

    constructor(private customerService: CustomerService) {}

    @Get()
    async getAllCustomers(): Promise<Customer[]> {
        return await this.customerService.getCustomers();
    }
}
