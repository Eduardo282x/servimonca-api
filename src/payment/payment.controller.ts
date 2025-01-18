import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, UpdatePaymentDto } from 'src/dtos/payments.dto';

@Controller('payment')
export class PaymentController {

    constructor(private paymentService: PaymentService) {

    }

    @Get()
    async getPaments() {
        return this.paymentService.getPaments();
    }

    @Get('/banks')
    async getBanks() {
        return this.paymentService.getBanks();
    }

    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.createPayment(createPaymentDto);
    }

    @Put()
    async update(@Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentService.updatePayment(updatePaymentDto);
    }

    @Delete('/:id')
    async remove(@Param('id') id: number) {
        return this.paymentService.deletePayment(id);
    }
}
