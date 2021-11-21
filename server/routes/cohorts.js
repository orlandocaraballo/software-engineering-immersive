import express from "express";
// import { studentsCollection } from "../db.js";

const cohortsRouter = express.Router();

cohortsRouter.get("/", async (req, res, next) => {
  try {
    const cohorts = await studentsCollection.distinct("cohort");

    res.json(cohorts);
  } catch (err) {
    next(err);
  }
});

cohortsRouter.get("/:name/students", async ({ params: { name } }, res) => {
  try {
    const cohortCursor = studentsCollection
      .find({ cohort: name })
      .project({ cohort: 0 });

    res.json(await cohortCursor.toArray());
  } catch (err) {
    next(err);
  }
});

export default cohortsRouter;
