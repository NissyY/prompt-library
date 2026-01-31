import { Injectable } from '@nestjs/common';
import { Prompt } from '../../domain/entities/prompt.entity';
import { PromptRepository } from '../../domain/repositories/prompt.repository';
import { CreatePromptDto } from '../dto/create-prompt.dto';

@Injectable()
export class CreatePromptUseCase {
  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(dto: CreatePromptDto, userId?: string): Promise<Prompt> {
    return this.promptRepository.create({
      title: dto.title,
      content: dto.content,
      category: dto.category,
      userId: userId ?? dto.userId,
    });
  }
}
