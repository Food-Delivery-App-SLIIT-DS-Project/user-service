import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from './common';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  void ConfigModule.forRoot({ isGlobal: true });
  const url = process.env.USER_SERVICE_URL || 'localhost:50052';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../user.proto'),
        package: USER_PACKAGE_NAME,
        url: url, // user-service
      },
    },
  );
  app.enableShutdownHooks();
  await app.listen();
  console.log(`User service is running on ${url}`);
}
void bootstrap();
