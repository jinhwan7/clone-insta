import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../users.entity';

export class UserSignUpDto extends PickType(UserEntity, [
  'email',
  'password',
  'nickname',
  'name',
  'profileImg',
] as const) {}
