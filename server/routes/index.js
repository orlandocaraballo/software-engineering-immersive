import express from "express";
import cohortsRouter from "./cohorts.js";
import studentsRouter from "./students.js";

const indexRouter = express.Router();

indexRouter.use("/students", studentsRouter);
indexRouter.use("/cohorts", cohortsRouter);

export default indexRouter;
