import { Filter, MongoClient, ObjectId } from "mongodb";
import { User } from "../../domain/user";
import { InsertUserDTO } from "../../interfaces/dto/insert-user.req";
import { UserServices } from "../../services/user";
import { UserCollection } from "../mongodb/collections/user";

import { AppError } from "../../error";
import { UserMapper } from "../../mappers/user";
import { PaginateListUsersDTO } from "../../interfaces/dto/paginate-list-users.req";
import { UserDocument } from "../mongodb/documents/user";
import { UpdateUserDTO } from "../../interfaces/dto/update-user";

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
        email: { $regex: input.emailAddress, $options: "i" },
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

  async list(input: PaginateListUsersDTO): Promise<User[]> {
    const limit = 10;
    const skip = input.page - 1;
    const filter: Filter<UserDocument> = {};
    if (input.name) {
      filter.$or = [
        { first_name: { $regex: input.name, $options: "i" } },
        { last_name: { $regex: input.name, $options: "i" } },
      ];
    }
    const users = await this.userCollection
      .find(filter)
      .limit(limit)
      .skip(limit * skip)
      .sort({ _id: -1 })
      .toArray();
    return users.map((user) => UserMapper.toDomain(user));
  }

  async read(id: string): Promise<User> {
    const exists = await this.userCollection.findOne({
      _id: { $eq: new ObjectId(id) },
    });
    if (exists == null) {
      throw new AppError("User not found", 404);
    }
    return UserMapper.toDomain(exists);
  }

  async remove(id: string): Promise<User | undefined> {
    const session = this.client.startSession();
    try {
      session.startTransaction();
      const exists = await this.userCollection.findOne({
        _id: { $eq: new ObjectId(id) },
      });
      if (exists == null) {
        throw new AppError("User not found", 404);
      }
      await this.userCollection.deleteOne({
        _id: { $eq: exists._id },
      });
      return UserMapper.toDomain(exists);
    } catch (error) {
      console.error("Transaction aborted due to error:", error);
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async update(input: UpdateUserDTO, id: string): Promise<User | undefined> {
    const userId = new ObjectId(id);
    const session = this.client.startSession();
    try {
      session.startTransaction();
      const exists = await this.userCollection.findOne({
        _id: userId,
      });
      if (exists == null) {
        throw new AppError("User not found", 404);
      }
      const updated = await this.userCollection.updateOne(
        {
          _id: userId,
        },
        input,
      );
      if (updated.modifiedCount < 1) {
        throw new AppError("User to be updated not found", 404);
      }
      const result = await this.userCollection.findOne({
        _id: userId,
      });
      if (result == null) {
        throw new Error("Updating user failed");
      }
      return UserMapper.toDomain(result);
    } catch (error) {
      console.error("Transaction aborted due to error:", error);
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
