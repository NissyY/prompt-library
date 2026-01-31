import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePromptDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category?: string;
}
