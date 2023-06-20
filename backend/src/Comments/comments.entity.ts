import { IsNotEmpty, IsInt, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/entity/common.entity';
import { PostEntity } from 'src/Posts/posts.entity';
import { UserCommentLikeEntity } from 'src/UserCommentLikes/userCommentLikes.entity';
import { UserCommentTagEntity } from 'src/UserCommentTags/userCommentTags.entity';
import { UserEntity } from 'src/Users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Comment' })
export class CommentEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
    example: 'ㅋㅋ 진짜 웃기네',
  })
  @IsString({ message: 'Comment 의 Type은 String 입니다.' })
  @IsNotEmpty({ message: 'Comment 의 값이 공백입니다.' })
  @Column({ type: 'text' })
  comment: string;

  @ApiProperty({
    description: 'parentId가 1일 경우 1번 댓글의 대댓글입니다.',
    required: true,
    example: '1',
  })
  @Column({ type: 'int' })
  parentId: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  postId: number;

  //*   Relation    */

  //*   Comment | 1 : M | UserCommentLike
  @OneToMany(
    () => UserCommentLikeEntity,
    (userCommentLike) => userCommentLike.comment,
    {
      cascade: true,
    },
  )
  userCommentLike: UserCommentLikeEntity[];

  //*   Comment | 1 : M | UserCommentTag
  @OneToMany(
    () => UserCommentTagEntity,
    (userCommentTag) => userCommentTag.comment,
    {
      cascade: true,
    },
  )
  userCommentTag: UserCommentTagEntity[];

  //*   Comment | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.comment)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  //*   Comment | M : 1 | Post
  @ManyToOne(() => PostEntity, (post) => post.comment)
  @JoinColumn({ name: 'postId' })
  post: PostEntity;
}
