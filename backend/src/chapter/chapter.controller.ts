import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('chapters')
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  // This is the public route for the Reader
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterService.findOne(id);
  }

  // This is the route the "Manage" page uses to list chapters for a story
  // It will be called as: GET http://localhost:3000/chapters/story/[storyId]
  @UseGuards(JwtGuard)
  @Get('story/:storyId')
  findAllByStory(@Param('storyId') storyId: string) {
    return this.chapterService.findAllByStory(storyId);
  }

  @UseGuards(JwtGuard)
  @Post('story/:storyId')
  create(@Param('storyId') storyId: string, @Body() dto: any) {
    return this.chapterService.create(storyId, dto);
  }
}