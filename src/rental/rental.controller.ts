import { Controller, Get } from '@nestjs/common';
import { RentalService } from './rental.service';
import { Rental } from '@prisma/client';

@Controller('rental')
export class RentalController {

    constructor(private rentalService: RentalService) {
        
    }

    @Get()
    async getRentals(): Promise<Rental[]> {
        return this.rentalService.getRentals();
    }
}
