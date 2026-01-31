import { Prompt } from '../entities/prompt.entity';

export interface PromptQuery {
  category?: string;
  keyword?: string;
  userId?: string;
}

export interface CreatePromptInput {
  title: string;
  content: string;
  category: string;
  userId?: string;
}

export abstract class PromptRepository {
  abstract findById(id: string): Promise<Prompt | null>;
  abstract findAll(query: PromptQuery): Promise<Prompt[]>;
  abstract create(input: CreatePromptInput): Promise<Prompt>;
  abstract update(id: string, prompt: Partial<Prompt>): Promise<Prompt | null>;
  abstract delete(id: string): Promise<boolean>;
}
