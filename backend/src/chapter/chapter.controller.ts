import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('stories/:storyId/chapters')
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @Post()
  create(@Param('storyId') storyId: string, @Body() dto: any) {
    return this.chapterService.create(storyId, dto);
  }

  @Get()
  findAllByStory(@Param('storyId') storyId: string) {
    return this.chapterService.findAllByStory(storyId);
  }
}