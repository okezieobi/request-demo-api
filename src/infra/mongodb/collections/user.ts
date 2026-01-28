import { mongoDatabase } from "../client";
import { UserDocument } from "../documents/user";

export const UserCollection = mongoDatabase.collection<UserDocument>("users");
