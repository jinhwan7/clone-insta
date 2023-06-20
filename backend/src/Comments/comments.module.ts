import { AuthModule } from './../auth/auth.module';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { UsersModule } from 'src/Users/users.module';
import { UserEntity } from 'src/Users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, UserEntity]),
    AuthModule,
    UsersModule,
  ],
  providers: [CommentsService, JwtStrategy],
  controllers: [CommentsController],
})
export class CommentsModule {}
