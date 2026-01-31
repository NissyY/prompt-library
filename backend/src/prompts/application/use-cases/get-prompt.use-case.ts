import { Injectable } from '@nestjs/common';
import { Prompt } from '@/prompts/domain/entities/prompt.entity';
import { PromptRepository } from '@/prompts/domain/repositories/prompt.repository';

@Injectable()
export class GetPromptUseCase {
  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(id: string): Promise<Prompt | null> {
    return this.promptRepository.findById(id);
  }
}
