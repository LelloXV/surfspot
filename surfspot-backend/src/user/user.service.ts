import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    async findByUsername(username: string) {
        return this.userRepo.findOne({ where: { username } });
    }

    async getAllUsers() {
        return this.userRepo.find();
    }

    async registerUser(user: User){
        const hashedPassword = await bcrypt.hash(user.password, 12);
        const newUser = this.userRepo.create({
            ...user,
            password: hashedPassword,
        });
        return this.userRepo.save(newUser);
    }
}
