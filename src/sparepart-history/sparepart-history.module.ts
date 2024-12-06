import { Module } from '@nestjs/common';
import { SparepartHistoryController } from './sparepart-history.controller';
import { SparepartHistoryService } from './sparepart-history.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SparepartHistoryController],
  providers: [SparepartHistoryService, PrismaService]
})
export class SparepartHistoryModule {}
