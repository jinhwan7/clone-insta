import { CommonEntity } from 'src/common/entity/common.entity';
import { PostEntity } from 'src/Posts/posts.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Image' })
export class ImageEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  imgUrl: string;

  @Column({ type: 'int' })
  postId: number;

  //*   Relation    */

  //*   Image | M : 1 | Post
  @ManyToOne(() => PostEntity, (post) => post.image)
  @JoinColumn({ name: 'postId' })
  post: PostEntity;
}
