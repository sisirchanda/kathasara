import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // <--- Ensure this is imported
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    // Register the JwtModule so the JwtService becomes available
    JwtModule.register({
      global: true, // This makes JwtService available everywhere if needed
      secret: process.env.JWT_SECRET || 'secretKey', // It will look for your .env variable
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}