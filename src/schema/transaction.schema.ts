import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MMember } from './member.schema';
import { MBook } from './book.schema';

@Schema()
export class MTransaction extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'MTransaction' })
  id?: string;

  @Prop({ type: Types.ObjectId, ref: 'Member' })
  member: MMember;

  @Prop({ type: Types.ObjectId, ref: 'Book' })
  book: MBook;

  @Prop()
  borrowedDate: Date;

  @Prop()
  returnDate: Date;

  @Prop()
  isReturned: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(MTransaction);

