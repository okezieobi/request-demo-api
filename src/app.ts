import express from "express";
import logger from "morgan";

import { logErrors, clientErrorHandler, errorHandler } from "./error-handlers";

const app = express();
const router = express.Router();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router.use("/users", usersRouter);
app.use("/api/v1", router);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
export default app;
