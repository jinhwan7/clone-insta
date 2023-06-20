import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserSignUpDto } from './dtos/users.signup.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '회원가입',
    description: '회원가입',
  })
  @ApiBadRequestResponse({
    description: 'Request Body의 타입이 올바르지 않을 경우',
  })
  @ApiConflictResponse({ description: '이미 가입된 이메일이 존재 할 경우' })
  @ApiCreatedResponse({ description: '회원가입에 성공한 경우' })
  @Post('signup')
  async signUp(@Body() body: UserSignUpDto) {
    return await this.usersService.signUp(body);
  }
}
