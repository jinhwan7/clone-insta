import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../comments.entity';

export class CommentCreateDto extends PickType(CommentEntity, [
  'comment',
  'parentId',
  'userId',
  'postId',
] as const) {}
