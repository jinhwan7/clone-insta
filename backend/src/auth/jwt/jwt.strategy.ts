import { JwtPayload } from './jwt.payload.dto';
import { UsersService } from '../../Users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.usersService.findUserById(payload.id);
      if (user) return payload;
      throw new Error();
    } catch (err) {
      throw new BadRequestException('유효하지 않은 토큰입니다.');
    }
  }
}
