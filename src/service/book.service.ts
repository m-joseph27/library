import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MBook } from 'src/schema/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(MBook.name)
    private bookModel: Model<MBook>
  ) {}

  async findAll(): Promise<MBook> {
    return this.bookModel.find().lean();
  }

  async findByCode(code: string): Promise<MBook> {
    return this.bookModel.findOne({ code: code }).exec();
  }

  async create(book: MBook): Promise<MBook> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async update(
    code: string,
    title: string,
    author: string,
    stock: number
  ): Promise<MBook> {
    return this.bookModel.findOneAndUpdate({ code: code }, { title, author, stock }, { new: true }).exec();
  }

  async delete(code: string): Promise<MBook> {
    return this.bookModel.findOneAndDelete({ code: code }).exec();
  }
}
