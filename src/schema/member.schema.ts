import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MMember extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;


  @Prop()
  penaltyUntil: Date;

  @Prop()
  penalty: boolean

  @Prop({ type: [String], default: [] })
  booksBorrowed: string[];
}

export const MemberSchema = SchemaFactory.createForClass(MMember);