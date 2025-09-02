import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SurfSpotModule } from './surfspot/surfspot.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherController } from './weather/weather.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',      // oppure il tuo host
      port: 5432,
      username: 'postgres',
      password: 'surf',
      database: 'surfmap',
      autoLoadEntities: true,
      synchronize: false, // Solo per sviluppo! ⚠️ In produzione metti false
    }),
    UserModule,
    SurfSpotModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  controllers: [WeatherController],
})
export class AppModule {}


