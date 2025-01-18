import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RentalService } from './rental.service';
import { Rental } from '@prisma/client';
import { DtoRental, DtoUpdateRental, DtoUpdateStatusRental } from 'src/dtos/rental.dto';

@Controller('rental')
export class RentalController {

    constructor(private rentalService: RentalService) {}

    @Get('/:status')
    async getRentals(@Param('status') status: string): Promise<Rental[]> {
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
    @Put()
    async updateRent(@Body() rent: DtoUpdateRental) {
        return await this.rentalService.updateRent(rent);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.rentalService.deleteRent(id);
    }




}
