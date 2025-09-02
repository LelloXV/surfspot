import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController{
    constructor(private readonly UserService: UserService) {}

    @Get()
    async getAllUsers(){
        return this.UserService.getAllUsers();
    }
}
