import { Injectable } from '@nestjs/common';
import { Prompt } from '../../domain/entities/prompt.entity';
import { PromptRepository } from '../../domain/repositories/prompt.repository';
import { UpdatePromptDto } from '../dto/update-prompt.dto';

@Injectable()
export class UpdatePromptUseCase {
  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(id: string, dto: UpdatePromptDto): Promise<Prompt | null> {
    return this.promptRepository.update(id, dto);
  }
}
