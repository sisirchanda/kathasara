import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  // Save a new chapter
  async create(storyId: string, dto: any) {
    return this.prisma.chapter.create({
      data: {
        title: dto.title,
        content: dto.content,
        order: dto.order || 1,
        storyId: storyId,
      },
    });
  }

  // Get all chapters for a story
  async findAllByStory(storyId: string) {
    return this.prisma.chapter.findMany({
      where: { storyId: storyId },
      orderBy: { order: 'asc' },
    });
  }
}