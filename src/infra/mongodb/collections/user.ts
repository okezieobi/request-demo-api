import { mongoDatabase } from "../client";
import { UserDocument } from "../documents/user";
import debugLib from "debug";

export const UserCollection = mongoDatabase.collection<UserDocument>("users");
export type UserCollection = typeof UserCollection;

const debug = debugLib("request-demo-api:user-collection");
export class SetUpUserCollectionIndexes {
  private static async forNames() {
    try {
      const collection = mongoDatabase.collection<UserDocument>("users");
      // 1. Check if the search index already exists
      const textIndexName = "user_name_text_search";
      const existingIndexes = await this.checkIndexExists([textIndexName]);
      if (existingIndexes) {
        debug("User collection  first and last name index already exists");
        return;
      }
      await collection.createIndex(
        { first_name: "text", last_name: "text" },
        { name: "user_name_text_search" },
      );

      debug("Text index for names initiated successfully");
    } catch (error) {
      debug("Failed to create text index: %O", error);
    }
  }

  private static async checkIndexExists(fields: string[]): Promise<boolean> {
    const collection = mongoDatabase.collection<UserDocument>("users");
    const indexes = await collection.listIndexes().toArray();
    return indexes.some((index) => {
      const keys = Object.keys(index.key);
      return fields.every((field) => keys.includes(field));
    });
  }
  private static async forEmail() {
    const collection = mongoDatabase.collection<UserDocument>("users");
    const indexName = "idx_user_email_unique";
    const emailIndex = await this.checkIndexExists([indexName]);
    if (emailIndex) {
      debug("User collection  email index already exists");
      return;
    }
    await collection.createIndex(
      { email: 1 },
      {
        partialFilterExpression: {
          email: { $type: "string" },
        },
        unique: true,
        collation: { locale: "en", strength: 2 },
        name: indexName,
      },
    );

    debug("User collection  email index successfully created");
  }

  static async execute() {
    try {
      await this.forEmail();
      await this.forNames();
      debug("All User collection indexes verified/created.");
    } catch (error) {
      debug("Error setting up User collection indexes: %O", error);
      throw error;
    }
  }
}
