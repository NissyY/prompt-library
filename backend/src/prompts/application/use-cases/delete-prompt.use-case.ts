import { Injectable } from '@nestjs/common';
import { PromptRepository } from '../../domain/repositories/prompt.repository';

@Injectable()
export class DeletePromptUseCase {
  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.promptRepository.delete(id);
  }
}
