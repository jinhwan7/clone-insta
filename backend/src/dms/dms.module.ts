import { DMEntity } from './dms.entity';
import { UserEntity } from 'src/Users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/Users/users.module';
import { EventsModule } from './../events/events.module';
import { Module } from '@nestjs/common';
import { DmsController } from './dms.controller';
import { DmsService } from './dms.service';

@Module({
  imports: [
    EventsModule,
    UsersModule,
    TypeOrmModule.forFeature([UserEntity, DMEntity]),
  ],
  controllers: [DmsController],
  providers: [DmsService],
})
export class DmsModule {}
