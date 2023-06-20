import { UserEntity } from 'src/Users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver';
import { Repository } from 'typeorm';
@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URI,
    });
  }

  async validate(
    accesstoken: string,
    refereshtoken: string,
    profile: Profile,
  ): Promise<{ id: string }> {
    const { id, _json } = profile;
    const { email, profile_image } = _json;

    const provider: string = 'naver';
    const socialUser = new UserEntity();
    socialUser.name = provider;
    socialUser.password = id;
    socialUser.nickname = email.split('@')[0];
    socialUser.email = email;
    socialUser.profileImg = profile_image
      ? profile_image
      : process.env.DEFUALT_IMG_URL;

    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    if (!existUser) {
      const newUser = await this.userRepository.insert(socialUser);
      return { id: newUser.identifiers[0].id };
    }
    return { id: String(existUser.id) };
  }
}
