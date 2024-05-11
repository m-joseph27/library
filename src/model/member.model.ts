import * as mongoose from 'mongoose';

export interface Member extends mongoose.Document {
  code: string;
  name: string;
}

export interface MemberResponse {
  member: Member;
  message: string;
}