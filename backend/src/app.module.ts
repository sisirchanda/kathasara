import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoryModule } from './story/story.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [AuthModule, PrismaModule, StoryModule, ChapterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
