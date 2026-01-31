export class Prompt {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly category: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly userId?: string,
  ) {}
}
