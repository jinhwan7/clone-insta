"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const users_entity_1 = require("../Users/users.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const services_1 = require("@nestjs/common/services");
const axios_1 = require("axios");
const qs_1 = require("qs");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async kakaoLogin(payload) {
        const code = payload;
        const kakaoKey = '1b6507f790effacecbec0df34314f133';
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
            const response = await (0, axios_1.default)({
                method: 'POST',
                url: kakaoTokenUrl,
                timeout: 30000,
                headers,
                data: qs_1.default.stringify(body),
            });
            if (response.status === 200) {
                const headerUserInfo = {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    Authorization: 'Bearer ' + response.data.access_token,
                };
                const responseUserInfo = await (0, axios_1.default)({
                    method: 'GET',
                    url: kakaoUserInfoUrl,
                    timeout: 30000,
                    headers: headerUserInfo,
                });
                if (responseUserInfo.status === 200) {
                    console.log(responseUserInfo);
                    return responseUserInfo.data;
                }
                else {
                    throw new common_1.UnauthorizedException();
                }
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async kakaoUser(kakao) {
        const { id, properties, kakao_account } = kakao;
        const { email } = kakao_account;
        const kakaoUser = new users_entity_1.UserEntity();
        kakaoUser.password = String(id);
        kakaoUser.name = 'kakao';
        kakaoUser.email = email;
        kakaoUser.nickname = email.split('@')[0];
        kakaoUser.profileImg = properties.profile_image
            ? properties.profile_image
            : process.env.DEFUALT_IMG_URL;
        const existUser = await this.userRepository.findOneBy({
            email,
        });
        if (!existUser) {
       