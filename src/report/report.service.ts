import { Injectable } from '@nestjs/common';
import { Report } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {

    constructor(private prismaService: PrismaService) {}

    async getReports():Promise<Report[]> {
        return await this.prismaService.report.findMany();
    }
}
