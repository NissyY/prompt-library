import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePromptDto {
  @ApiPropertyOptional({ description: 'プロンプトのタイトル' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'プロンプトの内容' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ description: 'カテゴリ' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category?: string;
}
