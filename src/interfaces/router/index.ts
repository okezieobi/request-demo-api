import { Router } from "express";
import { UserServiceInfra } from "../../infra/services/user";
import { mongoClient } from "../../infra/mongodb/client";
import { UserCollection } from "../../infra/mongodb/collections/user";
import { UserRouter } from "./user";

export const router = Router();

const userServices = new UserServiceInfra(mongoClient, UserCollection);
router.use("/users", UserRouter(userServices));
