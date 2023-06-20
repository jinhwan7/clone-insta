import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ImageEntity } from 'src/Images/Images.entity';
import { AwsService } from 'src/common/aws/aws.service';
import { UserPostLikeEntity } from 'src/UserPostLikes/userPostLikes.entity';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([PostEntity, ImageEntity, UserPostLikeEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService, AwsService],
  exports: [PostsService],
})
export class PostsModule {}
