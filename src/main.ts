import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from './common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../user.proto'),
        package: USER_PACKAGE_NAME,
        url: 'localhost:50052', // user-service
      },
    },
  );
  app.enableShutdownHooks();
  await app.listen();
  console.log('User service is running on: http://localhost:50052');
}
void bootstrap();
