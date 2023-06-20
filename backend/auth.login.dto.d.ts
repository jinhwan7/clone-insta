import { UserEntity } from 'src/Users/users.entity';
declare const AuthLoginDto_base: import("@nestjs/common").Type<Pick<UserEntity, "email" | "password">>;
export declare class AuthLoginDto extends AuthLoginDto_base {
}
export {};
