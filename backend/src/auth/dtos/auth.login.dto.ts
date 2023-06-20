import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/Users/users.entity';

export class AuthLoginDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
