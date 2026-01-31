import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePromptDto {
  @ApiProperty({ description: 'プロンプトのタイトル', example: 'コードレビュー用プロンプト' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'プロンプトの内容',
    example: '以下のコードをレビューしてください...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'カテゴリ', example: 'development' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({ description: 'ユーザーID（将来の認証拡張用）' })
  @IsString()
  @IsOptional()
  userId?: string;
}
