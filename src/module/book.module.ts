import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from 'src/controller/book.controller';
import { BookService } from 'src/service/book.service';
import { MBook, MBookSchema } from 'src/schema/book.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: MBook.name, schema: MBookSchema }])
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
