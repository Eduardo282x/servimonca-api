import { Injectable } from '@nestjs/common';
import { Maintenance } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaintenanceService {

    constructor(private prismaService: PrismaService) {}

    async getMaintenances(): Promise<Maintenance[]> {
        return await this.prismaService.maintenance.findMany();
    }
}
