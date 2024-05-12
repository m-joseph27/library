import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { MMember } from '../schema/member.schema';

interface MemberResponse {
  success: boolean;
  message: string;
  data: MMember;
}
@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService
  ) {}

  @Get()
  async getAllmembers(): Promise<MemberResponse> {
    const members = await this.memberService.findAll();
    const response: MemberResponse = {
      success: true,
      message: 'Successfully retrieved all member',
      data: members,
    }
    return response;
  }

  @Get(':memberCode')
    async getMemberByCode(@Param('memberCode') memberCode: string): Promise<MemberResponse> {
      const member = await this.memberService.findByCode(memberCode);
      const response: MemberResponse = {
        success: true,
        message: `Successfully retrieved member with code ${memberCode}`,
        data: member,
      }
      if (!member) {
          throw new NotFoundException('Member not found');
      }
      return response;
    }

  @Post()
  async createMember(
    @Body() member: MMember
  ): Promise<MMember> {
    return this.memberService.create(member);
  }

  @Put(':memberCode')
    async updateMember(
        @Param('memberCode') memberCode: string,
        @Body('name') name: string 
    ): Promise<MemberResponse> {
        const updatedMember = await this.memberService.update(memberCode, name);
        const response: MemberResponse = {
          success: true,
          message: `Successfully update member with code ${memberCode}`,
          data: updatedMember,
        }
        if (!updatedMember) {
          throw new NotFoundException(`Member with code ${memberCode} not found`);
        }
        return response;
    }

  @Delete(':memberCode')
  async deleteUser(@Param('memberCode') memberCode: string): Promise<MemberResponse> {
    const member = await this.memberService.delete(memberCode);
    const response: MemberResponse = {
      success: true,
      message: `Successfully delete member with code ${memberCode}`,
      data: member,
    }
    if (!member) {
      throw new NotFoundException('User not found');
    }
    return response;
  }

  @Post('borrow')
  async borrowBook(@Body() borrowData: { memberCode: string; bookCode: string }) {
    try {
      const result = await this.memberService.borrowingBook(borrowData.memberCode, borrowData.bookCode);
      return {
        success: true,
        message: 'Book successfully borrowed',
        data: result
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('return')
  async returnBook(@Body() returnData: { memberCode: string; bookCode: string }) {
    try {
      const result = await this.memberService.returningBook(returnData.memberCode, returnData.bookCode);
      return {
        success: true,
        message: 'Book successfully returned',
        data: result
      };
    } catch (error) {
        throw new NotFoundException(error.message);
    }
  }
}
