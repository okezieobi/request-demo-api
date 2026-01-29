import { Router } from "express";
import { UserServices } from "../../services/user";
import { InsertUserDTO } from "../dto/insert-user.req";
import { PaginateListUsersDTO } from "../dto/paginate-list-users.req";

export const UserRouter = (services: UserServices) => {
  const router = Router();

  router.post("/", async (req, res, next) => {
    try {
      const input = await InsertUserDTO.parseAsync(req.body);
      const result = await services.insert(input);
      res.status(201).send({
        status: true,
        message: "success",
        data: result.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/list", async (req, res, next) => {
    try {
      const input = await PaginateListUsersDTO.parseAsync(req.body);
      const result = await services.list(input);
      res.send({
        status: true,
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
