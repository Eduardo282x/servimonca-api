import { Module } from '@nestjs/common';
import { SparepartController } from './sparepart.controller';
import { SparepartService } from './sparepart.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SparepartController],
  providers: [SparepartService, PrismaService]
})
export class SparepartModule {}
