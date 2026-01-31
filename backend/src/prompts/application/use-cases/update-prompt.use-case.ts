import { Injectable } from '@nestjs/common';
import { Prompt } from '@/prompts/domain/entities/prompt.entity';
import { PromptRepository } from '@/prompts/domain/repositories/prompt.repository';
import { UpdatePromptDto } from '@/prompts/application/dto/update-prompt.dto';

@Injectable()
export class UpdatePromptUseCase {
  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(id: string, dto: UpdatePromptDto): Promise<Prompt | null> {
    return this.promptRepository.update(id, dto);
  }
}
