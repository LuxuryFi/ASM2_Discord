import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) { //
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest(); //Get request from http request
    await super.logIn(request); //Run login with request
    return result; // returl true or fail
  }
}
