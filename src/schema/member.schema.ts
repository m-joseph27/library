import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Member extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;
  
  @Prop({ default: 0 })
  booksBorrowed: number;

  @Prop()
  penaltyUntil: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);