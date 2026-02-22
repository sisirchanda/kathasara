import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { ChapterService } from '../chapter/chapter.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StoryService, ChapterService],
  controllers: [StoryController]
})
export class StoryModule {}
