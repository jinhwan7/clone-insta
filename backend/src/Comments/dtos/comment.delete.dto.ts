import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../comments.entity';

export class CommentDeleteDto extends PickType(CommentEntity, [
  'userId',
  'id',
] as const) {}
