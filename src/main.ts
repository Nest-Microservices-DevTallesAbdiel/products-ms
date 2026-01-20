import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen();

  // await app.startAllMicroservices();
  /**Con este comando inicializariamos todos los microservicios
   * y esto haría que la aplicación sea híbrida entre la aplicación que tenemos en rest
   * y TCP.
   */

  logger.log(`Products microservice running on port ${envs.port}`)

}
bootstrap();
