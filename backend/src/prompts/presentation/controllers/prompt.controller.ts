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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatePromptUseCase } from '@/prompts/application/use-cases/create-prompt.use-case';
import { GetPromptUseCase } from '@/prompts/application/use-cases/get-prompt.use-case';
import { GetPromptsUseCase } from '@/prompts/application/use-cases/get-prompts.use-case';
import { UpdatePromptUseCase } from '@/prompts/application/use-cases/update-prompt.use-case';
import { DeletePromptUseCase } from '@/prompts/application/use-cases/delete-prompt.use-case';
import { CreatePromptDto } from '@/prompts/application/dto/create-prompt.dto';
import { UpdatePromptDto } from '@/prompts/application/dto/update-prompt.dto';
import { PromptQueryDto } from '@/prompts/application/dto/prompt-query.dto';

@ApiTags('prompts')
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
  @ApiOperation({ summary: 'プロンプトを作成' })
  @ApiResponse({ status: 201, description: 'プロンプトが作成されました' })
  @ApiResponse({ status: 400, description: 'バリデーションエラー' })
  async create(@Body() dto: CreatePromptDto) {
    return this.createPromptUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'プロンプト一覧を取得' })
  @ApiResponse({ status: 200, description: 'プロンプト一覧' })
  async findAll(@Query() query: PromptQueryDto) {
    return this.getPromptsUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'プロンプト詳細を取得' })
  @ApiParam({ name: 'id', description: 'プロンプトID' })
  @ApiResponse({ status: 200, description: 'プロンプト詳細' })
  @ApiResponse({ status: 404, description: 'プロンプトが見つかりません' })
  async findOne(@Param('id') id: string) {
    const prompt = await this.getPromptUseCase.execute(id);
    if (!prompt) {
      throw new NotFoundException(`Prompt with id ${id} not found`);
    }
    return prompt;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'プロンプトを更新' })
  @ApiParam({ name: 'id', description: 'プロンプトID' })
  @ApiResponse({ status: 200, description: 'プロンプトが更新されました' })
  @ApiResponse({ status: 404, description: 'プロンプトが見つかりません' })
  async update(@Param('id') id: string, @Body() dto: UpdatePromptDto) {
    const prompt = await this.updatePromptUseCase.execute(id, dto);
    if (!prompt) {
      throw new NotFoundException(`Prompt with id ${id} not found`);
    }
    return prompt;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'プロンプトを削除' })
  @ApiParam({ name: 'id', description: 'プロンプトID' })
  @ApiResponse({ status: 204, description: 'プロンプトが削除されました' })
  @ApiResponse({ status: 404, description: 'プロンプトが見つかりません' })
  async remove(@Param('id') id: string) {
    const deleted = await this.deletePromptUseCase.execute(id);
    if (!deleted) {
      throw new NotFoundException(`Prompt with id ${id} not found`);
    }
  }
}
