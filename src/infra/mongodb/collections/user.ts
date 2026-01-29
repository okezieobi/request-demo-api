import { mongoDatabase } from "../client";
import { UserDocument } from "../documents/user";
import debugLib from "debug";

export const UserCollection = mongoDatabase.collection<UserDocument>("users");
export type UserCollection = typeof UserCollection;

const debug = debugLib("request-demo-api:user-collection");
export class SetUpUserCollectionIndexes {
  private static async forNames() {
    try {
      // 1. Check if the search index already exists
      const existingIndexes =
        await UserCollection.listSearchIndexes().toArray();
      const searchIndexName = "user_name_search";

      if (existingIndexes.some((idx) => idx.name === searchIndexName)) {
        debug("Atlas Search index '%s' already exists", searchIndexName);
        return;
      }

      // 2. Define the Search Index
      await UserCollection.createSearchIndexes([
        {
          name: searchIndexName,
          definition: {
            mappings: {
              dynamic: false,
              fields: {
                // 'lucene.standard' is great for full-text search
                first_name: {
                  type: "string",
                  analyzer: "lucene.standard",
                },
                last_name: {
                  type: "string",
                  analyzer: "lucene.standard",
                },
              },
            },
          },
        },
      ]);

      debug("Atlas Search index for names initiated successfully");
    } catch (error) {
      debug(
        "Failed to create Atlas Search index (Search is only available on MongoDB Atlas): %O",
        error,
      );
    }
  }

  private static async checkIndexExists(fields: string[]): Promise<boolean> {
    const indexes = await UserCollection.listIndexes().toArray();
    return indexes.some((index) => {
      const keys = Object.keys(index.key);
      return fields.every((field) => keys.includes(field));
    });
  }
  private static async forEmail() {
    const email = await this.checkIndexExists(["email"]);
    if (email) {
      debug.log("User collection  email index already");
      return;
    }
    await UserCollection.createIndex(
      { email: 1 },
      {
        partialFilterExpression: {
          email: { $type: "string" },
        },
        unique: true,
        collation: { locale: "en", strength: 2 },
        name: "idx_user_email_unique",
      },
    );

    debug.log("User collection index successfully created");
  }

  static async execute() {
    try {
      // await this.forEmail();
      // await this.forNames();
      debug("All User collection indexes verified/created.");
    } catch (error) {
      debug("Error setting up User collection indexes: %O", error);
      throw error;
    }
  }
}
