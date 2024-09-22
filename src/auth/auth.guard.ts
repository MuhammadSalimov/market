import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly Jwt: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token)
        throw new HttpException(' Unauthorized ', HttpStatus.BAD_REQUEST);
      const secret = this.config.get<string>('SECRET_KEY');
      const verify = await this.Jwt.verifyAsync(token, {
        secret: secret,
      });
      if (!verify) return false;
      const id = verify.id;
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) throw new UnauthorizedException();
      req.user = {
        id: user.id,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

@Injectable()
export class CheckAdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user?.id;
    console.log(userId);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.role !== 'admin') {
      throw new HttpException('User is not admin', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}

@Injectable()
export class CheckSellerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user?.id;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.role !== 'seller') {
      throw new HttpException('User is not seller', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}

@Injectable()
export class CheckManagerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user?.id;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.role !== 'warehouse_manager') {
      throw new HttpException(
        'User is not warehouse_manager',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
