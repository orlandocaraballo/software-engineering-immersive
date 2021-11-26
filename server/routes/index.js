import express from "express";
import cohortsRouter from "./cohorts.js";
import studentsRouter from "./students.js";
import authRouter from "./auth.js";
import usersRouter from "./users.js";

const indexRouter = express.Router();

indexRouter.use("/students", studentsRouter);
indexRouter.use("/cohorts", cohortsRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/users", usersRouter);

export default indexRouter;
