import express from "express";
import bcrypt from "bcrypt";
import { usersCollection } from "../db.js";

const authRouter = express.Router();

authRouter.get("/", async (req, res, next) => {
  res.json("hello auth get");
});

authRouter.post("/", async ({ body: { username, password } }, res, next) => {
  try {
    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      return res
        .status(404)
        .json(`User with username of ${username} not found`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json(`Password does not match`);
    }

    // do authorization logic

    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

export default authRouter;
