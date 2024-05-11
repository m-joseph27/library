import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { MBook } from 'src/schema/book.schema';
import { BookService } from 'src/service/book.service';

@Controller('books')
export class BookController {
  constructor(
    private bookService: BookService
  ) {}

  @Get()
  async getAllBooks(): Promise<MBook> {
    const books = await this.bookService.findAll();
    return books;
  }

  @Get(':code')
  async getBookByCode(
    @Param('code') code: string
  ): Promise<MBook> {
    const book = await this.bookService.findByCode(code);
    if (!book) {
      throw new NotFoundException('Book not found!');
    }
    return book;
  }

  @Post()
  async createBook(
    @Body() book: MBook
  ): Promise<MBook> {
    return this.bookService.create(book);
  }

  @Put(':code')
  async updateBook(
    @Param('code') code: string,
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('stock') stock: number,
  ): Promise<MBook> {
    const updatedBook = await this.bookService.update(code, title, author, stock);
    if (!updatedBook) {
      throw new NotFoundException(`Book with code ${code} not found`)
    }
    return updatedBook;
  }

  @Delete(':code')
  async deleteBook(@Param('code') code: string): Promise<MBook> {
    const book = await this.bookService.delete(code);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
}
