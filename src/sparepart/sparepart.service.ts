import { Injectable } from '@nestjs/common';
import { SparePart } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SparepartService {

    constructor(private prismaService: PrismaService) {}

    async getSpareparts(): Promise<SparePart[]> {
        return this.prismaService.sparePart.findMany();
    }
}
