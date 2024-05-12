import { Injectable, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MMember } from 'src/schema/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(MMember.name)
    private memberModel: Model<MMember>
  ) {}

  async findAll(): Promise<MMember> {
    return this.memberModel.find().lean();
  }

  async findByCode(memberCode: string): Promise<MMember> {
    return this.memberModel.findOne({ code: memberCode }).exec();
  }

  async create(member: MMember): Promise<MMember> {
    const newMember = new this.memberModel(member);
    return newMember.save();
  }

  async update(memberCode: string, name: string): Promise<MMember> {
    return this.memberModel.findOneAndUpdate({ code: memberCode }, { $set: { name: name } }, { new: true }).exec();
  }

  async delete(memberCode: string): Promise<MMember> {
    return this.memberModel.findOneAndDelete({ code: memberCode }).exec();
  }
}