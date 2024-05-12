import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, Response, HttpStatus } from '@nestjs/common';
import { MBook } from 'src/schema/book.schema';
import { BookService } from 'src/service/book.service';

interface BookResponse {
  success: boolean;
  message: string;
  data: MBook;
}
@Controller('books')
export class BookController {
  constructor(
    private bookService: BookService
  ) {}

  @Get()
  async getAllBooks(): Promise<BookResponse> {
    const books = await this.bookService.findAll();
    const response: BookResponse = {
      success: true,
      message: 'Successfully retrieved all books',
      data: books,
    }
    return response;
  }

  @Get(':code')
  async getBookByCode(
    @Param('code') code: string
  ): Promise<BookResponse> {
    const book = await this.bookService.findByCode(code);
    const response: BookResponse = {
      success: true,
      message: `Successfully retrieved the book with code ${code}`,
      data: book,
    }
    if (!book) {
      throw new NotFoundException('Book not found!');
    }
    return response;
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
  ): Promise<BookResponse> {
    const updatedBook = await this.bookService.update(code, title, author, stock);
    const response: BookResponse = {
      success: true,
      message: 'Successfully update the book',
      data: updatedBook,
    }
    if (!updatedBook) {
      throw new NotFoundException(`Book with code ${code} not found`)
    }
    return response;
  }

  @Delete(':code')
  async deleteBook(@Param('code') code: string): Promise<BookResponse> {
    const book = await this.bookService.delete(code);
    const response: BookResponse = {
      success: true,
      message: `Successfully delete the book with code ${code}`,
      data: book,
    }
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return response;
  }
}
