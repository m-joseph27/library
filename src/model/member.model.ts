import * as mongoose from 'mongoose';

export interface MMember extends mongoose.Document {
  code: string;
  name: string;
  booksBorrowed: number;
  penaltyUntil: Date;
}