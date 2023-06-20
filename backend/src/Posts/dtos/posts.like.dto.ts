import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';

export class PostLikeDto extends PickType(PostEntity, [
  'userId',
  'id',
] as const) {}
