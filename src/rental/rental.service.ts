import { Injectable } from '@nestjs/common';
import { Rental } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentalService {

    constructor(private prismaService: PrismaService) { }

    async getRentals(): Promise<Rental[]> {
        return await this.prismaService.rental.findMany({
            include: {
                customer: true,
                equipment: true,
            }
        });
    }
}
