import { KakaoDataDto } from './dtos/kakao.dto';
import { AuthLoginDto } from './dtos/auth.login.dto';
import { tokenType } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/Users/users.entity';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common/services';
import axios from 'axios';
import qs from 'qs';
import { GoogleDataDto } from './dtos/google.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  //////////////////////////////////////////////////////////////////
  // 카카오 로그인 ///
  /////////////////////////////////////////////////////////////////
  async kakaoLogin(payload: string) {
    const code = payload;
    const kakaoKey = '1b6507f790effacecbec0df34314f133'; /////// 이부분은 REST_API KEY
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    const body = {
      grant_type: 'authorization_code',
      client_id: kakaoKey,
      redirect_uri: `http://localhost:3000/oauth`,
      code,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const response = await axios({
        method: 'POST',
        url: kakaoTokenUrl,
        timeout: 30000,
        headers,
        data: qs.stringify(body),
      });

      if (response.status === 200) {
        const headerUserInfo = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: 'Bearer ' + response.data.access_token,
        };
        const responseUserInfo = await axios({
          method: 'GET',
          url: kakaoUserInfoUrl,
          timeout: 30000,
          headers: headerUserInfo,
        });

        if (responseUserInfo.status === 200) {
          console.log('리스폰스 서비스 유저인포', responseUserInfo);
          return responseUserInfo.data;
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  //////////////////////////////////////////////////////////////////
  // 카카오 회원가입 ///
  /////////////////////////////////////////////////////////////////
  async kakaoUser(kakao: KakaoDataDto) {
    const { id, properties, kakao_account } = kakao;
    const { email } = kakao_account;
    const kakaoUser = new UserEntity();
    kakaoUser.password = String(id);
    kakaoUser.name = 'kakao';
    kakaoUser.email = email;
    kakaoUser.nickname = email.split('@')[0];
    kakaoUser.profileImg = properties.profile_image
      ? properties.profile_image
      : process.env.DEFUALT_IMG_URL;

    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });

    if (!existUser) {
      const newKakao = await this.userRepository.insert(kakaoUser);
      const tokenId: number = newKakao.identifiers[0].id;
      const nickname: string = newKakao.identifiers[0].nickname;
      const token = await this.createToken({ id: tokenId });
      return { token, nickname };
    } else {
      const tokenId: number = existUser.id;
      const nickname: string = existUser.nickname;
      const token = await this.createToken({ id: tokenId });
      return { token, nickname };
    }
  }

  /////////////
  //구글 로그인///
  /////////////
  async googleLogin(payload: string): Promise<GoogleDataDto> {
    const code = payload;
    const google_client_id = process.env.GOOGLE_CLIENT_ID;
    const google_client_secret = process.env.GOOGLE_CLIENT_SECRET; //'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';
    const google_grant_type = 'authorization_code';
    const google_redirect_uri = 'http://localhost:3000/oauthGoogle';
    const google_url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${google_client_id}&client_secret=${google_client_secret}&redirect_uri=${google_redirect_uri}&grant_type=${google_grant_type}`;

    try {
      const access_token = await axios
        .post(google_url, {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })
        .then((el) => {
          return el.data.access_token;
        })
        .catch((err) => {
          console.log('err=', err);
        });
      const googleAPI = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`;
      if (access_token) {
        const responseUserInfo = await axios
          .get(googleAPI, {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          })
          .then((el) => {
            return el.data;
          })
          .catch((err) => {
            console.log('err=', err);
          });

        if (responseUserInfo) {
          return responseUserInfo;
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  ////////////
  //구글 회원가입
  ////////////
  async googleUser(google: GoogleDataDto) {
    const { id, email, picture } = google;
    const googleUser = new UserEntity();
    googleUser.password = String(id);
    googleUser.name = 'google';
    googleUser.email = email;
    googleUser.nickname = email.split('@')[0];
    googleUser.profileImg = picture ? picture : process.env.DEFUALT_IMG_URL;

    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    if (!existUser) {
      const newGoogle = await this.userRepository.insert(googleUser);
      const tokenId: number = newGoogle.identifiers[0].id;
      const nickname: string = newGoogle.identifiers[0].nickname;
      const token = await this.createToken({ id: tokenId });
      return { token, nickname };
    } else {
      const tokenId: number = existUser.id;
      const nickname: string = existUser.nickname;
      const token = await this.createToken({ id: tokenId });
      return { token, nickname };
    }
  }
  //////////////////////////////////////////////////////////////////
  // 로컬 로그인 ///
  /////////////////////////////////////////////////////////////////
  async localLogin(req: AuthLoginDto) {
    const { password, email } = req;
    const existUser: UserEntity = await this.userRepository.findOneBy({
      email,
    });
    Logger.log(JSON.parse(JSON.stringify(existUser)), 'Auth');
    if (!existUser) {
      throw new NotFoundException('회원정보를 찾을 수 없습니다.');
    }

    if (
      existUser.name === 'kakao' ||
      existUser.name === 'google' ||
      existUser.name === 'naver'
    ) {
      return { id: String(existUser.id), nickname: existUser.nickname };
    }

    const check = await bcrypt.compare(password, existUser.password);
    Logger.log(check, 'Auth');
    if (check) {
      return { id: String(existUser.id), nickname: existUser.nickname };
    } else {
      throw new UnauthorizedException('아이디 또는 비빌번호를 확인해주세요');
    }
  }
  //////////////////////////////////////////////////////////////////
  // 토큰생성 ///
  /////////////////////////////////////////////////////////////////
  async createToken(req): Promise<tokenType> {
    const payload = req;

    Logger.log(req, 'CreateToken');

    const accessToken = this.jwtService.sign(
      { id: payload.id },
      {
        expiresIn: '10m',
        secret: process.env.JWT_SECRET,
      },
    );

    const refreshToken = this.jwtService.sign(
      {},
      {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET,
      },
    );

    return {
      AccessToken: `Bearer ${accessToken}`,
      RefreshToken: `Bearer ${refreshToken}`,
    };
  }
}
