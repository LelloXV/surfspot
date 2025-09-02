import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


type AuthInput = {username: string; password: string};
type SignInData = {userId: number; username: string};
type AuthResult = {accessToken: string; username: string; userId: number}


@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(input: AuthInput): Promise<SignInData | null>{
    const user = await this.userService.findByUsername(input.username);
    if(user && await bcrypt.compare(input.password, user.password)){
      return {
        userId: user.id,
        username: user.username
      }
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult>{
    const payload = {
      sub: user.userId,
      username: user.username
    }

    const accessToken = await this.jwtService.signAsync(payload);
    return {accessToken, username: user.username, userId: user.userId};
  } 
}
