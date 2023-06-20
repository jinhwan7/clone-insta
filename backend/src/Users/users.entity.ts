import { DMEntity } from './../dms/dms.entity';
import { IsString, IsNotEmpty, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from 'src/Comments/comments.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { FollowEntity } from 'src/Follows/follows.entity';
import { PostEntity } from 'src/Posts/posts.entity';
import { UserCommentLikeEntity } from 'src/UserCommentLikes/userCommentLikes.entity';
import { UserCommentTagEntity } from 'src/UserCommentTags/userCommentTags.entity';
import { UserPostLikeEntity } from 'src/UserPostLikes/userPostLikes.entity';
import { UserPostTagEntity } from 'src/UserPostTags/userPostTags.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity extends CommonEntity {
  @ApiProperty({
    description: 'User의 고유한 id',
    required: true,
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: 'User의 Email',
    required: true,
    example: 'wndhdks4536@gmail.com',
  })
  @IsString({ message: 'Email 의 Type은 String 입니다.' })
  @IsNotEmpty({ message: 'Email의 값이 공백입니다.' })
  @Length(7, 50, { message: 'Email의 길이가 7이하, 50 이상입니다.' })
  @Column({ type: 'varchar', length: 50 })
  email: string;

  @ApiProperty({
    description: 'User의 Password',
    required: true,
    example: 'q1w2e3r4',
  })
  @IsString({ message: 'Password 의 Type은 String 입니다.' })
  @IsNotEmpty({ message: 'Password 의 값이 공백입니다.' })
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @ApiProperty({
    description: 'User의 Nickname',
    required: true,
    example: '닉넴뭐하지',
  })
  @IsString({ message: 'Nickname 의 Type은 String 입니다.' })
  @IsNotEmpty({ message: 'Nickname 의 값이 공백입니다.' })
  @Column({ type: 'varchar', length: 10 })
  nickname: string;

  @ApiProperty({
    description: 'User의 name',
    required: true,
    example: '신중완',
  })
  @IsString({ message: 'Name 의 Type은 String 입니다.' })
  @IsNotEmpty({ message: 'Name 의 값이 공백입니다.' })
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'text' })
  profileImg: string;

  //*   Relation    */

  //*   User | 1 : M | Post
  @OneToMany(() => PostEntity, (post) => post.user, {
    cascade: true,
  })
  post: PostEntity[];

  //*   User | 1 : M | Comment
  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    cascade: true,
  })
  comment: CommentEntity[];

  //*   User | 1 : M | UserPostLike
  @OneToMany(() => UserPostLikeEntity, (userPostLike) => userPostLike.user, {
    cascade: true,
  })
  userPostLike: UserPostLikeEntity[];

  //*   User | 1 : M | UserCommentLike
  @OneToMany(
    () => UserCommentLikeEntity,
    (userCommentLike) => userCommentLike.user,
    {
      cascade: true,
    },
  )
  userCommentLike: UserCommentLikeEntity[];

  //*   User | 1 : M | UserPostTag
  @OneToMany(() => UserPostTagEntity, (userPostTag) => userPostTag.user, {
    cascade: true,
  })
  userPostTag: UserPostTagEntity[];

  //*   User | 1 : M | UserCommentTag
  @OneToMany(
    () => UserCommentTagEntity,
    (userCommentTag) => userCommentTag.user,
    {
      cascade: true,
    },
  )
  userCommentTag: UserCommentTagEntity[];

  //*   User | 1 : M | Follow
  @OneToMany(() => FollowEntity, (follower) => follower.user, {
    cascade: true,
  })
  follower: FollowEntity[];

  @OneToMany(() => FollowEntity, (followee) => followee.user, {
    cascade: true,
  })
  followee: FollowEntity[];

  //*   User | 1 : M | DMs
  @OneToMany(() => DMEntity, (dms) => dms.Sender)
  DMs: DMEntity[];

  //*   User | 1 : M | DMs
  @OneToMany(() => DMEntity, (dms) => dms.Receiver)
  DMs2: DMEntity[];
}
