import { Injectable } from '@nestjs/common';
import { SparePartHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SparepartHistoryService {

    constructor(private prismaService: PrismaService) {}

    async getSparepartHistory(): Promise<SparePartHistory[]> {
        return await this.prismaService.sparePartHistory.findMany({
            include: {
                sparePart: true
            }
        });
    }
}
