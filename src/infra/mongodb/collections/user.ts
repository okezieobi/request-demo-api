import { mongoDatabase } from "../client";
import { UserDocument } from "../documents/user";
import debugLib from "debug";

export const UserCollection = mongoDatabase.collection<UserDocument>("users");
export type UserCollection = typeof UserCollection;

const debug = debugLib("request-demo-api:user-collection");
export class SetUpUserCollectionIndexes {
  private static async forEmail() {
    const email = await UserCollection.indexExists("email");
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
      },
    );

    debug.log("User collection index successfully created");
  }

  static async execute() {
    await this.forEmail();
  }
}
