import { CommonEntity } from 'src/common/entity/common.entity';
import { PostHashTagEntity } from 'src/PostHashTag/postHashTag.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'HashTag' })
export class HashTagEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  hashTag: string;

  //*   Relation    */

  //*   HashTag | 1 : M | PostHashTag
  @OneToMany(() => PostHashTagEntity, (postHashTag) => postHashTag.hashTag, {
    cascade: true,
  })
  postHashTag: PostHashTagEntity[];
}
