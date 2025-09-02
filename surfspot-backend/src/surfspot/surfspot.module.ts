import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurfSpot } from './surfspot.entity';
import { SurfSpotService } from './surfspot.service';
import { SurfSpotController } from './surfspot.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurfSpot, User])],
  controllers: [SurfSpotController],
  providers: [SurfSpotService],
})
export class SurfSpotModule {}
