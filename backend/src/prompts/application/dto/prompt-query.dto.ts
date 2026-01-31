import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PromptQueryDto {
  @ApiPropertyOptional({ description: 'カテゴリでフィルタリング' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'タイトル・内容でキーワード検索' })
  @IsString()
  @IsOptional()
  keyword?: string;
}
