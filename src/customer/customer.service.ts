import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
    
    constructor(private prismaService: PrismaService) {}

    async getCustomers():Promise<Customer[]>{
        return await this.prismaService.customer.findMany();
    }
}
