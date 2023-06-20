import { CommonEntity } from 'src/common/entity/common.entity';
import { UserEntity } from 'src/Users/users.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Follow' })
export class FollowEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // @Column({ type: 'int' })
  // followingUserId: number;

  // @Column({ type: 'int' })
  // FollowedUserId: number;

  //*   Relation    */

  //*   Follow | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.follower)
  @JoinColumn({ name: 'followingUserId' })
  user: UserEntity;

  //*   Follow | M : 1 | User
  @ManyToOne(() => UserEntity, (user) => user.followee)
  @JoinColumn({ name: 'followedUserId' })
  user2: UserEntity;
}
