import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

   
    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic' || !credentials) return false;

    const [email, password] = credentials.split(':');

    if (!email || !password) return false;

    return true;
  }
}