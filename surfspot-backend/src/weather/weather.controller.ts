import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  private readonly baseUrl = 'http://maps.openweathermap.org/maps/2.0/weather/WND';

  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getTile(
    @Query('x') x: string,
    @Query('y') y: string,
    @Query('z') z: string,
    @Res() res: Response,
  ) {
    try {
      // recupero chiave API dalle env
      const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');

      // costruisco l'URL per il tile
      const tileUrl = `${this.baseUrl}/${z}/${x}/${y}?opacity=0.5&appid=${apiKey}`;
      
      // faccio la fetch
      const response = await fetch(tileUrl);

      if (!response.ok) {
        return res.status(response.status).send('Errore nel recupero tile');
      }

      // prendo i dati come buffer (immagine PNG)
      const buffer = Buffer.from(await response.arrayBuffer());

      // imposto header corretti
      res.setHeader('Content-Type', 'image/png');
      res.send(buffer);
    } catch (err) {
      console.error(err);
      res.status(500).send('Errore interno');
    }
  }
}
