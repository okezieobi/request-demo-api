import { mongoDatabase } from "../client";
import { UserDocument } from "../docs/user";

export const UserCollection = mongoDatabase.collection<UserDocument>("users");
