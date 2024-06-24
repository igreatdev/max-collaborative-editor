import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { Socket } from 'socket.io';

export const SKIP_AUTH_KEY = 'skipAuth';
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);

      const user = await this.authService.validateUserById(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class AuthWsGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) {
      return true;
    }

    const client = context.switchToWs().getClient();
    const token = client.handshake.auth.token ?? undefined;

    if (!token) {
      // throw new UnauthorizedException();
      return this.rejectRequest(client);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);

      const user = await this.authService.validateUserById(payload.sub);

      if (!user) {
        return this.rejectRequest(client);
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      client['user'] = user;
    } catch (e) {
      return this.rejectRequest(client);
    }
    return true;
  }

  private rejectRequest(client: Socket) {
    console.log('Unauthorized - Rejecting request');
    client.emit('unAuthorized');
    client.disconnect();
    return false;
  }
}
