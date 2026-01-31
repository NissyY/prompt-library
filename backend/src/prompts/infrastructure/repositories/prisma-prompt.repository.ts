import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prompt } from '../../domain/entities/prompt.entity';
import {
  PromptRepository,
  PromptQuery,
  CreatePromptInput,
} from '../../domain/repositories/prompt.repository';
import { Prompt as PrismaPrompt } from '@/generated/prisma';

@Injectable()
export class PrismaPromptRepository extends PromptRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findById(id: string): Promise<Prompt | null> {
    const data = await this.prisma.prompt.findUnique({
      where: { id },
    });

    return data ? this.toEntity(data) : null;
  }

  async findAll(query: PromptQuery): Promise<Prompt[]> {
    const where: Record<string, unknown> = {};

    if (query.category) {
      where.category = query.category;
    }

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.keyword) {
      where.OR = [
        { title: { contains: query.keyword, mode: 'insensitive' } },
        { content: { contains: query.keyword, mode: 'insensitive' } },
      ];
    }

    const data = await this.prisma.prompt.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return data.map((item) => this.toEntity(item));
  }

  async create(input: CreatePromptInput): Promise<Prompt> {
    const data = await this.prisma.prompt.create({
      data: {
        title: input.title,
        content: input.content,
        category: input.category,
        userId: input.userId,
      },
    });

    return this.toEntity(data);
  }

  async update(id: string, prompt: Partial<Prompt>): Promise<Prompt | null> {
    const existing = await this.prisma.prompt.findUnique({ where: { id } });
    if (!existing) {
      return null;
    }

    const data = await this.prisma.prompt.update({
      where: { id },
      data: {
        title: prompt.title,
        content: prompt.content,
        category: prompt.category,
      },
    });

    return this.toEntity(data);
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.prisma.prompt.findUnique({ where: { id } });
    if (!existing) {
      return false;
    }

    await this.prisma.prompt.delete({ where: { id } });
    return true;
  }

  private toEntity(data: PrismaPrompt): Prompt {
    return new Prompt(
      data.id,
      data.title,
      data.content,
      data.category,
      data.createdAt,
      data.updatedAt,
      data.userId ?? undefined,
    );
  }
}
