import { Router } from "express";
import { UserServices } from "../../services/user";
import { InsertUserDTO } from "../dto/insert-user.req";
import { PaginateListUsersDTO } from "../dto/paginate-list-users.req";
import { UserIdDTO } from "../dto/read-user-by-id.req";
import { UpdateUserDTO } from "../dto/update-user";

export const UserRouter = (services: UserServices) => {
  const router = Router();

  router.post("/", async (req, res, next) => {
    try {
      const input = await InsertUserDTO.parseAsync(req.body);
      const result = await services.insert(input);
      res.status(201).send({
        status: true,
        message: "success",
        data: result,
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

  router.get("/:user_id", async (req, res, next) => {
    try {
      const input = await UserIdDTO.parseAsync(req.params);
      const result = await services.read(input.user_id);
      res.send({
        status: true,
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:user_id", async (req, res, next) => {
    try {
      const input = await UserIdDTO.parseAsync(req.params);
      const result = await services.remove(input.user_id);
      res.send({
        status: true,
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  });

  router.patch("/:user_id", async (req, res, next) => {
    try {
      const filter = await UserIdDTO.parseAsync(req.params);
      const input = await UpdateUserDTO.parseAsync(req.body);
      const result = await services.update(input, filter.user_id);
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
