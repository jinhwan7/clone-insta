import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';
export class PostDeleteDto extends PickType(PostEntity, [
  'id',
  'userId',
] as const) {}
