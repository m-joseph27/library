import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { MMember } from '../model/member.model';

@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService
  ) {}

  @Get()
  async getAllmembers(): Promise<MMember[]> {
    const members = await this.memberService.findAll();
    return members;
  }

  @Get(':memberCode')
    async getMemberByCode(@Param('memberCode') memberCode: string): Promise<MMember> {
      const member = await this.memberService.findByCode(memberCode);
      if (!member) {
          throw new NotFoundException('Member not found');
      }
      return member;
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
    ): Promise<MMember> {
        const updatedMember = await this.memberService.update(memberCode, name);
        if (!updatedMember) {
          throw new NotFoundException(`Member with code ${memberCode} not found`);
        }
        return updatedMember;
    }

  @Delete(':memberCode')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('memberCode') memberCode: string): Promise<MMember> {
    const member = await this.memberService.delete(memberCode);
    if (!member) {
      throw new NotFoundException('User not found');
    }
    return member;
  }
}