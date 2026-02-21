import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { StoryService } from './story.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('stories')
export class StoryController {
  constructor(private storyService: StoryService) {}

  @Post()
  create(@Req() req: any, @Body() dto: any) {
    // req.user is populated by our JwtStrategy
    return this.storyService.create(req.user.id, dto);
  }
}