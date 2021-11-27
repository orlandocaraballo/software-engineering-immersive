import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { usersCollection } from "../db.js";

const authRouter = express.Router();

async function requireToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    const badTokenResponse = "Bad token";

    if (!authorization) {
      return res.status(401).json(badTokenResponse);
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json(badTokenResponse);
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) {
      return res.status(401).json("Bad credentials");
    }

    const user = await usersCollection.findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { password: 0 } }
    );

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

authRouter.get("/", requireToken, async ({ user }, res, next) => {
  res.json(user);
});

authRouter.post("/", async ({ body: { username, password } }, res, next) => {
  try {
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json(`User with username of ${username} not found`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json(`Password does not match`);
    }

    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.status(201).send({ accessToken });
  } catch (err) {
    next(err);
  }
});

export default authRouter;
