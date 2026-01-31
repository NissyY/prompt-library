import { Module } from '@nestjs/common';
import { PromptRepository } from './domain/repositories/prompt.repository';
import { CreatePromptUseCase } from './application/use-cases/create-prompt.use-case';
import { GetPromptUseCase } from './application/use-cases/get-prompt.use-case';
import { GetPromptsUseCase } from './application/use-cases/get-prompts.use-case';
import { UpdatePromptUseCase } from './application/use-cases/update-prompt.use-case';
import { DeletePromptUseCase } from './application/use-cases/delete-prompt.use-case';
import { PrismaPromptRepository } from './infrastructure/repositories/prisma-prompt.repository';
import { PromptController } from './presentation/controllers/prompt.controller';

@Module({
  providers: [
    // Use Cases
    CreatePromptUseCase,
    GetPromptUseCase,
    GetPromptsUseCase,
    UpdatePromptUseCase,
    DeletePromptUseCase,

    // Repository binding: Interface -> Implementation
    {
      provide: PromptRepository,
      useClass: PrismaPromptRepository,
    },
  ],
  controllers: [PromptController],
})
export class PromptsModule {}
