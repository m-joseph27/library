import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from './module/member.module';
import { BookModule } from './module/book.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/eigen'),
    MemberModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
