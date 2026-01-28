export class Base {
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Base>) {
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  toJSON() {
    return {
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
