import { Injectable } from '@nestjs/common';
import { Equipment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquipmentService {

    constructor(private prismaService: PrismaService) {}

    async getEquipment():Promise<Equipment[]>{
        return await this.prismaService.equipment.findMany();
    }
}
