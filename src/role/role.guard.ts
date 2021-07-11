import { Injectable, CanActivate, ExecutionContext, Session } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),  //Get roles
      context.getClass(),  // Get role value
    ]);

    if (!requiredRoles) { // there are no require role, CanACtive function always return true
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const role = request.user ? request.user.role_id : '' // Get user role from request user

    if (!requiredRoles.includes(role)){ // Return false if user role is not match with required role
      return false;
    }
    return true; //return true if user role is match with required role.
  }
}
