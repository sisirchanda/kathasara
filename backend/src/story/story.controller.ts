import { Body, Controller, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
import { StoryService } from './story.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';

@Controller('stories')
export class StoryController {
  constructor(private storyService: StoryService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: any, @Body() dto: any) {
    return this.storyService.create(req.user.id, dto);
  }

  @UseGuards(JwtGuard)
  @Get('my-stories')
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

  // --- Day 11: Likes & Comments ---

  @UseGuards(JwtGuard)
  @Post(':id/like')
  toggleLike(@Param('id') storyId: string, @GetUser('id') userId: string) {
    return this.storyService.toggleLike(userId, storyId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/comments')
  addComment(
    @Param('id') storyId: string, 
    @GetUser('id') userId: string, 
    @Body('content') content: string
  ) {
    return this.storyService.addComment(userId, storyId, content);
  }

  @Get(':id/comments')
  getComments(@Param('id') storyId: string) {
    return this.storyService.getComments(storyId);
  }

  // --- Day 11: Chapter Management ---
  // Adding these fixes the "Cannot GET /stories/:id/chapters" 404 error

  @UseGuards(JwtGuard)
  @Post(':id/chapters')
  createChapter(
    @Param('id') storyId: string,
    @GetUser('id') userId: string,
    @Body() dto: any
  ) {
    return this.storyService.createChapter(userId, storyId, dto);
  }

  @Get(':id/chapters')
  getChapters(@Param('id') storyId: string) {
    return this.storyService.getChaptersByStory(storyId);
  }
}