import { MongoClient } from "mongodb";
import { User } from "../../domain/user";
import { InsertUserDTO } from "../../interfaces/dto/insert-user.req";
import { UserServices } from "../../services/user";
import { UserCollection } from "../mongodb/collections/user";

import { AppError } from "../../error";
import { UserMapper } from "../../mappers/user";
import { PaginateListDTO } from "../../interfaces/dto/paginate-list.req";

export class UserServiceInfra extends UserServices {
  constructor(
    private readonly client: MongoClient,
    private readonly userCollection: UserCollection,
  ) {
    super();
  }
  async insert(input: InsertUserDTO): Promise<User> {
    const session = this.client.startSession();
    try {
      session.startTransaction();
      const exists = await this.userCollection.findOne({
        email: { $regex: input.emailAddress, options: "i" },
      });
      if (exists != null) {
        throw new AppError("User already exists", 409);
      }
      const arg = new User({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const inserted = await this.userCollection.insertOne(
        UserMapper.toPersistence(arg),
      );
      const newUser = await this.userCollection.findOne({
        _id: inserted.insertedId,
      });
      if (newUser == null) {
        throw Error("User insert failed");
      }
      return UserMapper.toDomain(newUser);
    } catch (error) {
      console.error("Transaction aborted due to error:", error);
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async list(input: PaginateListDTO): Promise<User[]> {
    const limit = 10;
    const users = await this.userCollection
      .find({})
      .limit(limit)
      .skip(limit * input.page)
      .toArray();
    return users.map((user) => UserMapper.toDomain(user));
  }
}
