import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log("auth.service called")
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
        console.log("auth service recalled for checking")
      const { password, ...result } = user;
      console.log("auth service recalled with valid user details from database ")
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}