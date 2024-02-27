import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from './config/configuration';
import { HorseRaceModule } from './modules/horserace/horserace.module';
import { MongooseConfigService } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisConfigService } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Configuration] }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    CacheModule.registerAsync({ useClass: RedisConfigService, isGlobal: true }),
    AuthModule,
    UserModule,
    HorseRaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
