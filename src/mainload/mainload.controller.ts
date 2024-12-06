import { Controller, Get } from '@nestjs/common';
import { MainloadService } from './mainload.service';
import { DtoBaseResponse } from 'src/dtos/base.dto';

@Controller('mainload')
export class MainloadController {

    constructor(private mainloadService: MainloadService) { }
    @Get()
    async mainload(): Promise<DtoBaseResponse> {
        return await this.mainloadService.generateData();
    }
}
