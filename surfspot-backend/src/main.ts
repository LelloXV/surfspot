import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
