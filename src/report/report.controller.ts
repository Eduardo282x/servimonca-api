import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from '@prisma/client';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) {
        
    }

    @Get()
    async getReport(): Promise<Report[]> {
        return await this.reportService.getReports();
    }
}
