import { CommentEntity } from './../../Comments/comments.entity';
import { ImageEntity } from './../../Images/Images.entity';
import { PostEntity } from './../../Posts/posts.entity';
import { UserEntity } from './../../Users/users.entity';
import { Connection, DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const usersRepository = dataSource.getRepository(UserEntity);
    await usersRepository.insert([
      {
        id: 1,
        email: 'test@test.com',
        password:
          '$2b$10$6XILag0LyymJQOFU3rgvl.KYJ.UcXMuQxBIWQoSzl16vwI2mjOryC',
        nickname: 'test',
        name: '신중완',
        profileImg:
          'https://www.google.com/search?q=Seeds&sxsrf=AJOqlzXjOxs7YRJPadQPHoF5IHKMmQ6lDg:1675168062838&tbm=isch&source=iu&ictx=1&vet=1&fir=S-iMY5W5N_9kzM%252CiSBxb7cxjBbCaM%252C%252Fm%252F09dh0%253BSDw4Y9iPaLvBaM%252C41bFklfHR4E3gM%252C_%253BHnm6fVsbw8M93M%252C6p_O9S_4iPeCZM%252C_%253BKN9FuiVMhkrPYM%252CETqJa4mGrK-8eM%252C_&usg=AI4_-kSFb2q83z9fwmO8jQx0cPw1IkQPOQ&sa=X&ved=2ahUKEwjq_suq5_H8AhUICYgKHc29CPsQ_B16BAhPEAE#imgrc=S-iMY5W5N_9kzM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const postsRepository = dataSource.getRepository(PostEntity);
    await postsRepository.insert([
      {
        id: 1,
        content: 'Seed 게시글',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const imageRepository = dataSource.getRepository(ImageEntity);
    await imageRepository.insert([
      {
        id: 1,
        imgUrl:
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod%2Fimages%2Fpumpkin-seeds-background-royalty-free-image-1636578293.jpg&imgrefurl=https%3A%2F%2Fwww.bicycling.com%2Fhealth-nutrition%2Fa38188482%2Fbest-seeds-to-eat-for-a-nutrition-boost%2F&tbnid=gzuaayy4-YPNaM&vet=12ahUKEwjo17P75_H8AhWRdXAKHV9eAoMQMygCegUIARDCAQ..i&docid=3pZlSSrx5d518M&w=2000&h=1500&q=Seeds&ved=2ahUKEwjo17P75_H8AhWRdXAKHV9eAoMQMygCegUIARDCAQ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const commentsRepository = dataSource.getRepository(CommentEntity);
    await commentsRepository.insert([
      {
        id: 1,
        comment: 'Seed 댓글',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}

// export class CreateInitialData implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     await connection
//       .createQueryBuilder()
//       .insert()
//       .into(Workspaces)
//       .values([{ id: 1, name: 'Sleact', url: 'sleact' }])
//       .execute();
//     await connection
//       .createQueryBuilder()
//       .insert()
//       .into(Channels)
//       .values([{ id: 1, name: '일반', WorkspaceId: 1, private: false }])
//       .execute();
//   }
// }
