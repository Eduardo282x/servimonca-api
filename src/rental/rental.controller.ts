import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RentalService, statusRental } from './rental.service';
import { Rental } from '@prisma/client';
import { DtoRental, DtoUpdateRental, DtoUpdateStatusRental } from 'src/dtos/rental.dto';

@Controller('rental')
export class RentalController {

    constructor(private rentalService: RentalService) {}

    @Get()
    async getRentalsAll(): Promise<Rental[]> {
        return this.rentalService.getRentalsAll();
    }

    @Get('/store')
    async getRentalsStore(): Promise<Rental[]> {
        return this.rentalService.getRentalsStore();
    }
    
    @Get('/:status')
    async getRentals(@Param('status') status: statusRental): Promise<Rental[]> {
        return this.rentalService.getRentals(status);
    }

    @Post()
    async createUser(@Body() newRent: DtoRental) {
        return await this.rentalService.createRent(newRent);
    }

    @Put('/status')
    async updateStatusRent(@Body() rent: DtoUpdateStatusRental) {
        return await this.rentalService.updateStatusRent(rent);
    }
}
