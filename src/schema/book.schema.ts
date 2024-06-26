import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MBook extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, default: false })
  isBorrowed: boolean;

  @Prop()
  borrowedBy: string;

  @Prop()
  borrowDate: Date;
}

export const MBookSchema = SchemaFactory.createForClass(MBook);