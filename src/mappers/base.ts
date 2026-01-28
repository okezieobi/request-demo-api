import { WithId } from "mongodb";
import { Base } from "../domain/base";
import { BaseDocument } from "../infra/mongodb/documents/base";

export class BaseMapper {
  static toDomain(raw: WithId<BaseDocument>): Base {
    return new Base({
      id: raw._id,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }

  static toPersistence(data: Base): BaseDocument {
    return {
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }
}
