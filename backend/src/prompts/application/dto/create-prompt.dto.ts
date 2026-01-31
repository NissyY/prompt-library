import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePromptDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
