import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- PRODUCTION CORS CONFIGURATION ---
  app.enableCors({
    // Replace with your actual Vercel domain
    origin: [
      'https://kathasara.vercel.app', 
      'http://localhost:3000' // Keeps local development working
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Throws error if extra data is sent
    transform: true, // Automatically transforms types (e.g. string to number)
  }));

  // Render uses process.env.PORT. Using 0.0.0.0 is crucial for Render's health checks.
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Kathasara API is live on port: ${port}`);
}
bootstrap();