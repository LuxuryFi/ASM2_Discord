import { Injectable, CanActivate, ExecutionContext, Session } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
 
    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest(); //
    const role = request.user ? request.user.role_id : ''

   console.log(role)
    if (!requiredRoles.includes(role)){
      return false;
    }
    return true;
  }
}
