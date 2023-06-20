import { UserEntity } from 'src/Users/users.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'dms' })
export class DMEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  content: string;

  @Column('int', { nullable: true })
  SenderId: number | null;

  @Column('int', { nullable: true })
  ReceiverId: number | null;

  //* Relation */

  //*   DMs | M : 1 | Users
  @ManyToOne(() => UserEntity, (user) => user.DMs)
  @JoinColumn({ name: 'SenderId', referencedColumnName: 'id' })
  Sender: UserEntity;

  //*   DMs | M : 1 | Users
  @ManyToOne(() => UserEntity, (user) => user.DMs2)
  @JoinColumn({ name: 'ReceiverId', referencedColumnName: 'id' })
  Receiver: UserEntity;
}
