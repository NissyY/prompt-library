import { Injectable } from '@nestjs/common';
import { Prompt } from '@/prompts/domain/entities/prompt.entity';
import { PromptRepository, PromptQuery } from '@/prompts/domain/repositories/prompt.repository';
import { PromptQueryDto } from '@/prompts/application/dto/prompt-query.dto';

@Injectable()
export class GetPromptsUseCase {
  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(dto: PromptQueryDto, userId?: string): Promise<Prompt[]> {
    const query: PromptQuery = {
      category: dto.category,
      keyword: dto.keyword,
      userId,
    };

    return this.promptRepository.findAll(query);
  }
}
