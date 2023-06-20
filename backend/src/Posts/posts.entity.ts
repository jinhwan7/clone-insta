import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CommentEntity } from 'src/Comments/comments.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { ImageEntity } from 'src/Images/Images.entity';
import { PostHashTagEntity } from 'src/PostHashTag/postHashTag.entity';
import { UserPostLikeEntity } from 'src/UserPostLikes/userPostLikes.entity';
import { UserPostTagEntity } from 'src/UserPostTags/userPostTags.entity';
import { UserEntity } from 'src/Users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Post' })
export class PostEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: '게시글의 Text',
    required: true,
    example:
      '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세',
  })
  @IsString({ message: 'Content 의 Type은 String 입니다.' })
  @IsNotEmpty({ message: 'Content 의 값이 공백입니다.' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'User의 고유한 ID값.',
    required: true,
    example: '1',
  })
  @IsInt({ message: 'Name 의 Type은 Number 입니다.' })
  @Column({ type: 'int' })
  userId: number;

  //*   Relation    */

  //*   Post | 1 : M | Comment
  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    cascade: true,
  })
  comment: CommentEntity[];

  //*   Post | 1 : M | Image
  @OneToMany(() => ImageEntity, (image) => image.post, {
    cascade: true,
  })
  image: ImageEntity[];

  //*   Post | 1 : M | PostHashTag
  @OneToMany(() => PostHashTagEntity, (postHashTag) => postHashTag.post, {
    cascade: true,
  })
  postHashTag: PostHashTagEntity[];

  //*   Post | 1 : M | UserPostTag
  @OneToMany(() => UserPostTagEntity, (userPostTag) => userPostTag.post, {
    cascade: true,
  })
  userPostTag: UserPostTagEntity[];

  //*   Post | 1 : M | UserPostLike
  @OneToMany(() => UserPostLikeEntity, (userPostLike) => userPostLike.post, {
    cascade: true,
  })
  userPostLike: UserPostLikeEntity[];

  //*   Post | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.post)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
