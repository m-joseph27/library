import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from 'src/controller/transaction.controller';
import { TransactionService } from 'src/service/transaction.service';
import { MTransaction, TransactionSchema } from '../schema/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MTransaction.name, schema: TransactionSchema }])
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
