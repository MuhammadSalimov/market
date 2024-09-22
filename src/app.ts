import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { FilterModule } from './filter/filter.module';
import { ProductModule } from './product/product.module';
import { AddRoleModule } from './add-role';
import { StoreModule } from './store/store.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartModule } from './cart';
import { LikesModule } from './like';
import { RaitingModule } from './raiting';
import { BannerModule } from './banner';
import { WarehouseModule } from './warehouse';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/img'),
    }),
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UploadModule,
    AddRoleModule,
    StoreModule,
    CategoryModule,
    FilterModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    CartModule,
    LikesModule,
    RaitingModule,
    BannerModule,
    WarehouseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
