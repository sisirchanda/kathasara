import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: any) {
    return this.prisma.story.create({
      data: {
        title: dto.title,
        summary: dto.summary,
        coverImage: dto.coverImage,
        categoryId: parseInt(dto.categoryId),
        authorId: userId, // Linked to the logged-in user
      },
    });
  }
}