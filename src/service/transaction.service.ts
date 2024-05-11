import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { MTransaction } from 'src/schema/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(MTransaction.name)
    private transactionModel: Model<MTransaction>
  ) {}

  async findAll(): Promise<MTransaction> {
    return this.transactionModel.find().lean();
  }

  async findByTransactionId(transactionId: string): Promise<MTransaction> {
    return this.transactionModel.findOne({ id: transactionId }).exec();
  }

  async create(transaction: MTransaction): Promise<MTransaction> {
    const newTransaction = new this.transactionModel(transaction);
    return newTransaction.save();
  }
}