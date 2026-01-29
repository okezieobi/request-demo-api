import express from "express";
import logger from "morgan";

import { ErrorHandlers } from "./error-handlers";
import { router } from "./interfaces/router";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", router);

app.use(ErrorHandlers.logErrors);
app.use(ErrorHandlers.handleZodErrors);
app.use(ErrorHandlers.clientErrorHandler);
app.use(ErrorHandlers.errorHandler);
export default app;
