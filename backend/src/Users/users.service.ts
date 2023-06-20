import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dtos/users.signup.dto';
import { UserEntity } from './users.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async signUp(body: UserSignUpDto) {
    const { nickname, email, password } = body;
    const profileImg = body.profileImg
      ? body.profileImg
      : process.env.DEFAULT_IMG_URL;

    const isUserEmailExists = await this.usersRepository.findOneBy({ email });
    if (isUserEmailExists)
      throw new ConflictException('이미 존재하는 Email 입니다.');

    const isUserNicknameExists = await this.usersRepository.findOneBy({
      nickname,
    });

    if (isUserNicknameExists)
      throw new ConflictException('이미 존재하는 Nickname 입니다.');

    const salt = Number(process.env.BCRYPT_SALT);

    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.usersRepository.save({
      ...body,
      password: hashedPassword,
      profileImg: profileImg,
    });
  }

  async findUserById(id) {
    return await this.usersRepository.findOneBy({ id });
  }

  /**
   * auth의 user 로그인서비스
   */
}
