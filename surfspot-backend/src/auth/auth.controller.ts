import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req){
        return this.authService.signIn(req.user);
    }

    
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getUserInfo(@Request() req) {
        return req.user; // contiene userId, username
    }


    @Post('debug')
    async debug(@Body() body) {
        console.log('Body ricevuto dal frontend:', body);
        return { received: body };
    }
}
