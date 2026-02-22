import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChapterService } from '../chapter/chapter.service';


@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService, private chapterService: ChapterService) {}

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
	async getChaptersByStory(storyId: string) {
		return this.chapterService.findAllByStory(storyId);
	}
	async createChapter(userId: string, storyId: string, dto: any) {
		const story = await this.prisma.story.findUnique({ where: { id: storyId } });
		if (!story) throw new NotFoundException('Story not found');
		if (story.authorId !== userId) throw new ForbiddenException('Not your story');

		return this.chapterService.create(storyId, dto);
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
	async toggleLike(userId: string, storyId: string) {
	  // Check if like exists
	  const existingLike = await this.prisma.like.findUnique({
		where: { userId_storyId: { userId, storyId } }
	  });

	  if (existingLike) {
		await this.prisma.like.delete({ where: { id: existingLike.id } });
		return { liked: false };
	  }

	  await this.prisma.like.create({ data: { userId, storyId } });
	  return { liked: true };
	}

	async addComment(userId: string, storyId: string, content: string) {
	  return this.prisma.comment.create({
		data: { content, userId, storyId },
		include: {
		  user: { select: { firstName: true, lastName: true, username: true } }
		}
	  });
	}

	async getComments(storyId: string) {
	  return this.prisma.comment.findMany({
		where: { storyId },
		include: {
		  user: { select: { firstName: true, lastName: true, username: true } }
		},
		orderBy: { createdAt: 'desc' }
	  });
	}
}