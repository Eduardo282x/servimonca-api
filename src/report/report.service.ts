import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {

    constructor(private prismaService: PrismaService) {}

    async getReports():Promise<string> {
        return 'REPORTE'
    }
}
