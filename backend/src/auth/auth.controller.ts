import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from './guard/jwt.guard';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: any) {
    return this.authService.login(dto);
  }
  
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return req.user; // The user object attached by JwtStrategy.validate()
  }
}