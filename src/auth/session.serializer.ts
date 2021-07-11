import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any { //Write logined user's information
    done(null, user);
  }
  deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {  //Read logined user's information in other request
    done(null, payload);
  }
}
