import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- ADD THIS LINE

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// This allows your Next.js frontend to talk to this backend
  app.enableCors();
// This enables the @IsEmail, @IsNotEmpty etc. checks in your DTOs
// This line caused the error because of the missing import above
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips away properties that shouldn't be there
  }));
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
