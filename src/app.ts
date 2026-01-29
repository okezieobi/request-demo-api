import express from "express";
import logger from "morgan";

import { ErrorHandlers } from "./error-handlers";

const app = express();
const router = express.Router();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router.use("/users", usersRouter);
app.use("/api/v1", router);

app.use(ErrorHandlers.logErrors);
app.use(ErrorHandlers.handleZodErrors);
app.use(ErrorHandlers.clientErrorHandler);
app.use(ErrorHandlers.errorHandler);
export default app;
