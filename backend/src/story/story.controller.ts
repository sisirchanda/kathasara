import { Body, Controller, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
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
  @UseGuards(JwtGuard)
  @Get('my-stories') // GET /stories/my-stories
  findMyStories(@Req() req: any) {
	return this.storyService.findByAuthor(req.user.id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
	return this.storyService.findOne(id);
  }
  
  @Get()
  findAll() {
	return this.storyService.findAll();
  }
}