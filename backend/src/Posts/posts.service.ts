import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../Users/users.entity';
import { ImageEntity } from 'src/Images/Images.entity';
import { UserPostLikeEntity } from 'src/UserPostLikes/userPostLikes.entity';
import { map } from 'rxjs';
import { PinpointSMSVoice } from 'aws-sdk';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(UserPostLikeEntity)
    private readonly likeRepository: Repository<UserPostLikeEntity>,
  ) {}

  async createPost(userId, body, imgUrl) {
    const { content } = body;
    const newPost = await this.postRepository.save({ userId, content });
    await this.imageRepository.save({
      imgUrl,
      postId: newPost.id,
    });

    return await this.findOnePost(newPost.id, newPost.userId);
  }

  async changePost(postId, body, userId) {
    const { content } = body;

    const result = await this.postRepository
      .createQueryBuilder()
      .update(PostEntity)
      .set({
        content: content,
      })
      .where('id = :id', { id: postId })
      .andWhere('userId=:userId', { userId: userId })
      .execute();
    if (result.affected === 0) {
      throw new ForbiddenException();
    }
    return;
  }

  async deletePost(data) {
    const { userId, id } = data;
    const result = await this.postRepository
      .createQueryBuilder()
      .softDelete()
      .from(PostEntity)
      .where('id = :id', { id: id })
      .andWhere('userId=:userId', { userId: userId })
      .execute();

    if (result.affected === 0) {
      throw new ForbiddenException();
    }
    return;
  }

  async findAllPost(userId: number) {
    const result = await this.postRepository
      .createQueryBuilder('p')
      .select([
        'p.id',
        'p.content',
        'p.createdAt',
        'p.updatedAt',
        'user.nickname',
        'user.id',
        'image.imgUrl',
        'likes',
      ])
      .leftJoin('p.user', 'user')
      .leftJoin('p.image', 'image')
      .leftJoin('p.userPostLike', 'likes')
      .loadRelationCountAndMap('p.userPostLike', 'p.userPostLike')
      .leftJoin('p.comment', 'Comment')
      .loadRelationCountAndMap('p.comment', 'p.comment')
      .getMany();
    return result.map((post) => {
      return {
        id: post.id,
        content: post.content,
        nickname: post.user.nickname,
        imageUrl: post.image[0].imgUrl,
        createAt: post.createdAt,
        updateAt: post.updatedAt,
        likes: post.userPostLike,
        commentCount: post.comment,
        myPost: Number(post.user.id) === Number(userId) ? true : false,
        // commentCount: post.comment.commentCount,
        // commentCount: post.commentCount,
        // comment: {
        //   id: post.comment[index].id,
        //   comment: post.comment[index].comment,
        //   nickname: post.comment[index].user.nickname,
        // },
      };
    });
  }

  async findOnePost(postId: number, userId: number) {
    const result = await this.postRepository
      .createQueryBuilder('p')
      .select([
        'p.id',
        'p.content',
        'p.createdAt',
        'p.updatedAt',
        'user.nickname',
        'image.imgUrl',
        'likes',
        'Comment.id',
        'Comment.comment',
        'Comment.userId',
        'Comment.createdAt',
        'Comment.updatedAt',
        'User.nickname',
      ])
      .where('p.id = :id', { id: postId })
      .leftJoin('p.user', 'user')
      .leftJoin('p.image', 'image')
      .leftJoin('p.userPostLike', 'likes')
      .leftJoin('p.comment', 'Comment')
      .leftJoin('Comment.user', 'User')
      .getOne();
    if (!result) throw new NotFoundException();
    return {
      id: result.id,
      content: result.content,
      nickname: result.user.nickname,
      imageUrl: result.image[0].imgUrl,
      createAt: result.createdAt,
      updateAt: result.updatedAt,
      likes: result.userPostLike.length,
      comment: result.comment.map((v) => {
        return {
          id: v.id,
          comment: v.comment,
          nickname: v.user.nickname,
          createdAt: v.createdAt,
          updatedAt: v.updatedAt,
          myComment: +v.userId === +userId ? true : false,
        };
      }),
    };
  }

  async likeEvent(data) {
    //있는 포스트인지 검사
    const { id, userId } = data;
    const result = await this.postRepository.findOneBy({ id: id });
    if (!result) throw new NotFoundException();

    const existLike = await this.likeRepository.findOne({
      where: {
        userId: userId,
        postId: id,
      },
    });
    if (!existLike) {
      const result = await this.likeRepository.save({ userId, postId: id });
      return result;
    } else {
      const result = await this.likeRepository.delete({
        userId: userId,
        postId: id,
      });
      return result;
    }
  }
}
