import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { MTransaction } from 'src/schema/transaction.schema';
import { TransactionService } from 'src/service/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private transactionService: TransactionService
  ) {}

  @Get()
  async getAllTransactions(): Promise<MTransaction> {
    const transactions = await this.transactionService.findAll();
    return transactions;
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string): Promise<MTransaction> {
    const transaction = await this.transactionService.findByTransactionId(id);
    if(!transaction) {
      throw new NotFoundException('Transaction not Found');
    }
    return transaction;
  }
}