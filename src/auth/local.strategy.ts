import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Header, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) { //Inject auth service
    super(); // inheritance constructore from passport strategy
  }

  async validate(username: string, password: string): Promise<any> { //validate function with two parameter username and password
    const user = await this.authService.validateUser(username, password); //call validate User from auth service
    if (!user) { //if has no user , reutn
     return;
    }
    return user; // if has user, return user
  }
}
