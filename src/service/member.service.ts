import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MMember } from 'src/schema/member.schema';
import { BookService } from './book.service';
import { MBook } from 'src/schema/book.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(MMember.name)
    private memberModel: Model<MMember>,
    private bookService: BookService,
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

  async borrowingBook(memberCode: string, bookCode: string): Promise<any> {
    const member = await this.memberModel.findOne({ code: memberCode });
    const book = await this.bookService.findByCode(bookCode);
  
    if (!member || !book) {
      throw new NotFoundException('Member or Book not found');
    }
  
    if (member.penaltyUntil && new Date() < member.penaltyUntil) {
      throw new Error('Member is currently penalized');
    }
  
    if (member.booksBorrowed.length >= 2) {
      throw new Error('Member cannot borrow more than 2 books');
    }
  
    if (book.isBorrowed) {
      throw new Error('Book is currently borrowed');
    }

    book.borrowDate = new Date();
    member.booksBorrowed.push(bookCode);
    book.isBorrowed = true;
    book.borrowedBy = memberCode;
    await member.save();
    await book.save();
    
    return { success: true, message: 'Book borrowed successfully' };
  }
  

  async returningBook(memberCode: string, bookCode: string): Promise<any> {
    const member = await this.memberModel.findOne({ code: memberCode });
    const book = await this.bookService.findByCode(bookCode);
  
    if (!member || !book || !member.booksBorrowed.includes(bookCode)) {
      throw new NotFoundException('Invalid member or book');
    }
  
    const borrowDate = new Date(book.borrowDate);  // Assume borrowDate is tracked
    const daysBorrowed = (new Date().getTime() - borrowDate.getTime()) / (1000 * 3600 * 24);
  
    if (daysBorrowed > 7) {
      member.penaltyUntil = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);  // Add 3 days penalty
    }
  
    member.booksBorrowed = member.booksBorrowed.filter(code => code !== bookCode);
    book.isBorrowed = false;
    book.borrowedBy = null;
    await member.save();
    await book.save();
  
    return { success: true, message: 'Book returned successfully' };
  }
  
}