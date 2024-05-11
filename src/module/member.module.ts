import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberController } from '../controller/member.controller';
import { MemberService } from '../service/member.service';
import { Member, MemberSchema } from '../schema/member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }])
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
