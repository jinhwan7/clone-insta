import { CommentDeleteDto } from './dtos/comment.delete.dto';
import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comments.entity';
import { CommentCreateDto } from './dtos/comment.create.dto';
import { CommentUpdateDto } from './dtos/comment.update.dto';
import { UserEntity } from 'src/Users/users.entity';
import { toFormData } from 'axios';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getAllComments(postId: number) {
    //* Nickname[UserEntity] , comment[CommentEntity], createdAt[CommentEntity]
    const comments = await this.commentsRepository
      .createQueryBuilder('c')
      .select(['c.id', 'c.comment', 'User.nickname', 'c.userId'])
      .innerJoin('c.user', 'User')
      .where('c.postId = :id', { id: postId })
      .andWhere('c.parentId = :parentId', { parentId: 0 })
      .getMany();

    return comments;
  }

  async getRecomments(parentId: number) {
    const comments = await this.commentsRepository
      .createQueryBuilder('c')
      .select(['c.id', 'c.comment', 'User.nickname'])
      .innerJoin('c.user', 'User')
      .where('c.parentId = :parentId', { parentId: parentId })
      .getMany();

    return comments;
  }

  async createComment(data: CommentCreateDto) {
    const comment = this.commentsRepository.create({
      comment: data.comment,
      parentId: 0,
      postId: data.postId,
      userId: data.userId,
    });
    if (!comment)
      throw new NotFoundException(
        '존재하지 않는 게시글에 댓글을 달수 없습니다',
      );
    await this.commentsRepository.insert(comment);
    const user = await this.getUserById(data.userId);
    const commentData = {
      ...comment,
      myComment: true,
      nickname: user.nickname,
    };
    return commentData;
  }

  async updateComment(data: CommentUpdateDto) {
    const comment = await this.commentsRepository
      .createQueryBuilder('c')
      .select(['c.userId', 'c.id'])
      .where('c.id = :id', { id: data.id })
      .getOne();

    if (!comment) throw new NotFoundException('존재하지 않는 댓글입니다.');

    if (data.userId !== comment.userId)
      throw new ForbiddenException('권한이 없습니다.');

    return await this.commentsRepository.update(data.id, {
      comment: data.comment,
    });
  }

  async deleteComment(data: CommentDeleteDto) {
    const comment = await this.commentsRepository
      .createQueryBuilder('c')
      .select(['c.userId', 'c.id'])
      .where('c.id = :id', { id: data.id })
      .getOne();
    console.log(comment);
    if (!comment) throw new NotFoundException('존재하지 않는 댓글입니다.');
    if (+data.userId !== comment.userId)
      throw new ForbiddenException('권한이 없습니다.');

    return await this.commentsRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id: data.id })
      .execute();
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
}
