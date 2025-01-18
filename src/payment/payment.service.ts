import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { CreatePaymentDto, UpdatePaymentDto } from 'src/dtos/payments.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankData } from './payment.data';

@Injectable()
export class PaymentService {

    constructor(private prismaService: PrismaService) {

    }


    async getPaments() {
        return this.prismaService.payment.findMany();
    }

    async getBanks() {
        return BankData;
    }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.payment.create({
                data: createPaymentDto,
            });
            baseResponse.message = 'Método de pago agregado'
            return baseResponse
        } catch (err) {
            badResponse.message += err;
            return badResponse;
        }
    }

    async updatePayment(updatePaymentDto: UpdatePaymentDto): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.payment.update({
                data: {
                    bank: updatePaymentDto.bank,
                    identify: updatePaymentDto.identify,
                    email: updatePaymentDto.email,
                    phone: updatePaymentDto.phone,
                    owner: updatePaymentDto.owner,
                    type: updatePaymentDto.type,
                },
                where: {
                    id: updatePaymentDto.id
                }
            });
            baseResponse.message = 'Método de pago actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async deletePayment(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.payment.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Método de pago eliminado.';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }
}
