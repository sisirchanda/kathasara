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
  async findByAuthor(authorId: string) {
	return this.prisma.story.findMany({
		where: { authorId: authorId },
		orderBy: { createdAt: 'desc' },
		include: {
		  _count: {
			select: { chapters: true } // This lets us show "5 Chapters" on the dashboard
		  }
		}
	  });
	}
	async findOne(id: string) {
	  return this.prisma.story.findUnique({
		where: { id },
		include: {
		  chapters: {
			orderBy: { order: 'asc' }
		  }
		}
	  });
	}
	async findAll() {
	  return this.prisma.story.findMany({
		include: {
		  category: true, // Join with Category table
		  _count: {
			select: { chapters: true }
		  }
		},
		orderBy: { createdAt: 'desc' }
	  });
	}
}