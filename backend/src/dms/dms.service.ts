import { EventsGateway } from './../events/events.gateway';
import { DMEntity } from './dms.entity';
import { UserEntity } from './../Users/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class DmsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(DMEntity)
    private readonly dmsRepository: Repository<DMEntity>,
    private readonly datasource: DataSource,
    private eventsGateway: EventsGateway,
  ) {}

  async getUserList() {
    return this.usersRepository.find({ select: ['nickname', 'id'] });
  }

  async getDMLogs(nickname: string, userId: number) {
    return this.dmsRepository
      .createQueryBuilder('sender')
      .innerJoin('user.dms', 'dms', 'dms.senderId = :id', { id: userId })
      .getMany();
  }

  async postDM(nickname: string, content: string, id: number, myId: number) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const dm = new DMEntity();
      dm.SenderId = myId;
      dm.ReceiverId = id;
      dm.content = content;

      const savedDM = await queryRunner.manager
        .getRepository(DMEntity)
        .save(dm);
      const dmWhitSender = await queryRunner.manager
        .getRepository(DMEntity)
        .findOne({ where: { id: savedDM.id }, relations: ['Sender'] });

      await queryRunner.commitTransaction();

      this.eventsGateway.server.to(nickname).emit('dm', dmWhitSender);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    // const savedDM =
  }
}
