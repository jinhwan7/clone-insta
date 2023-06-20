import { CommonEntity } from 'src/common/entity/common.entity';
import { HashTagEntity } from 'src/HashTags/hashTags.entity';
import { PostEntity } from 'src/Posts/posts.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'PostHashTag' })
export class PostHashTagEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  postId: number;

  @Column({ type: 'int' })
  hashTagId: number;

  //*   Relation    */

  //*   PostHashTag | M : 1 | Post
  @ManyToOne(() => PostEntity, (post) => post.postHashTag)
  @JoinColumn({ name: 'postId' })
  post: PostEntity;

  //*   PostHashTag | M : 1 | HashTag
  @ManyToOne(() => HashTagEntity, (hashTag) => hashTag.postHashTag)
  @JoinColumn({ name: 'hashTagId' })
  hashTag: HashTagEntity;
}
