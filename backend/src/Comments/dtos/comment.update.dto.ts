import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../comments.entity';

export class CommentUpdateDto extends PickType(CommentEntity, [
  'comment',
  'userId',
  'id',
] as const) {}
