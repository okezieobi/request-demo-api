export class Base {
  id: unknown;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Base>) {
    this.id = data.id;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  toJSON() {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
