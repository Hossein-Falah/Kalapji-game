import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TypeOrmConfig } from 'src/configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService:ConfigService) => TypeOrmConfig(configService),
      inject: [ConfigService]
    }),
    AuthModule, 
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}