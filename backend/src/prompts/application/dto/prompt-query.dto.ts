import { IsString, IsOptional } from 'class-validator';

export class PromptQueryDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  keyword?: string;
}
