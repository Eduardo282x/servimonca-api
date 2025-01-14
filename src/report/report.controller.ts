import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) {
        
    }

    @Get()
    async getReport(): Promise<string> {
        return await this.reportService.getReports();
    }
}
