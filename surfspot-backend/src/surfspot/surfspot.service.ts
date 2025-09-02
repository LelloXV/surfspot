import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurfSpot } from './surfspot.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class SurfSpotService {
  constructor(
    @InjectRepository(SurfSpot)
    private surfSpotRepo: Repository<SurfSpot>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async saveSurfSpot(spot: Partial<SurfSpot>, username: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newSpot = this.surfSpotRepo.create({ ...spot, owner: user });
    return this.surfSpotRepo.save(newSpot);
  }

  async getAllSpots() {
    return this.surfSpotRepo.find({ relations: ['owner'] });
  }

  async searchByName(name: string) {
    return this.surfSpotRepo.find({
      where: { name },
      relations: ['owner'],
    });
  }
}
