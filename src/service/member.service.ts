import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/schema/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<Member>
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async findByCode(memberCode: string): Promise<Member> {
    return this.memberModel.findOne({ code: memberCode }).exec();
  }

  async create(member: Member): Promise<Member> {
    const newMember = new this.memberModel(member);
    return newMember.save();
  }

  async update(memberCode: string, name: string): Promise<Member> {
    return this.memberModel.findOneAndUpdate({ code: memberCode }, { $set: { name: name } }, { new: true }).exec();
  }

  async delete(memberCode: string): Promise<Member> {
    return this.memberModel.findOneAndDelete({ code: memberCode }).exec();
  }
}