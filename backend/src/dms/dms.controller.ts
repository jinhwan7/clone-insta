import { JwtPayload } from './../auth/jwt/jwt.payload.dto';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { DmsService } from './dms.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { getUser } from 'src/common/decorator/user.data.decorator';

@ApiTags('DMs')
@Controller('dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @ApiOperation({ summary: 'DM Log 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get(':nickname')
  async getDMLogs(
    @Param('nickname') nickname: string,
    @getUser() payload: JwtPayload,
  ) {
    //
    return await this.dmsService.getDMLogs(nickname, payload.id);
  }
}
