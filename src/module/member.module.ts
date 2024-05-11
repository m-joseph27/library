import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberController } from '../controller/member.controller';
import { MemberService } from '../service/member.service';
import { MMember, MemberSchema } from '../schema/member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MMember.name, schema: MemberSchema }])
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
