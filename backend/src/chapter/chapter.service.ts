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
  
	async findOne(id: string) {
	  const chapter = await this.prisma.chapter.findUnique({
		where: { id },
		include: { 
		  story: { 
			include: { 
			  chapters: { orderBy: { order: 'asc' } } 
			} 
		  } 
		}
	  });

	  if (!chapter) return null;

	  const allChapters = chapter.story.chapters;
	  const currentIndex = allChapters.findIndex(c => c.id === id);

	  return {
		...chapter,
		storyTitle: chapter.story.title,
		storyId: chapter.story.id,
		prevId: allChapters[currentIndex - 1]?.id || null,
		nextId: allChapters[currentIndex + 1]?.id || null,
	  };
	}
}