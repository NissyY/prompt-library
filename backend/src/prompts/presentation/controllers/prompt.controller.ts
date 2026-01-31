import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreatePromptUseCase } from '../../application/use-cases/create-prompt.use-case';
import { GetPromptUseCase } from '../../application/use-cases/get-prompt.use-case';
import { GetPromptsUseCase } from '../../application/use-cases/get-prompts.use-case';
import { UpdatePromptUseCase } from '../../application/use-cases/update-prompt.use-case';
import { DeletePromptUseCase } from '../../application/use-cases/delete-prompt.use-case';
import { CreatePromptDto } from '../../application/dto/create-prompt.dto';
import { UpdatePromptDto } from '../../application/dto/update-prompt.dto';
import { PromptQueryDto } from '../../application/dto/prompt-query.dto';

@Controller('prompts')
export class PromptController {
  constructor(
    private readonly createPromptUseCase: CreatePromptUseCase,
    private readonly getPromptUseCase: GetPromptUseCase,
    private readonly getPromptsUseCase: GetPromptsUseCase,
    private readonly updatePromptUseCase: UpdatePromptUseCase,
    private readonly deletePromptUseCase: DeletePromptUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePromptDto) {
    return this.createPromptUseCase.execute(dto);
  }

  @Get()
  async findAll(@Query() query: PromptQueryDto) {
    return this.getPromptsUseCase.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const prompt = await this.getPromptUseCase.execute(id);
    if (!prompt) {
      throw new NotFoundException(`Prompt with id ${id} not found`);
    }
    return prompt;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePromptDto) {
    const prompt = await this.updatePromptUseCase.execute(id, dto);
    if (!prompt) {
      throw new NotFoundException(`Prompt with id ${id} not found`);
    }
    return prompt;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.deletePromptUseCase.execute(id);
    if (!deleted) {
      throw new NotFoundException(`Prompt with id ${id} not found`);
    }
  }
}
