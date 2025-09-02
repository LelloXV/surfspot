import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SurfSpotService } from './surfspot.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('surfspots')
export class SurfSpotController {
  constructor(private readonly surfSpotService: SurfSpotService) {}

  @Get()
  async getAllSpots() {
    return this.surfSpotService.getAllSpots();
  }

  @Post('createspot')
  @UseGuards(JwtAuthGuard) // Richiede autenticazione
  async create(@Body() body: any, @Request() req) {
    const username = req.user.username;
    console.log(body);
    return this.surfSpotService.saveSurfSpot(body, username);
  }

  @Get('search')
  async search(@Query('surfSpotName') name: string) {
    return this.surfSpotService.searchByName(name);
  }
}
