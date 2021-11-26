import express from "express";
import { MongoServerError, ObjectId } from "mongodb";
import { usersCollection } from "../db.js";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

function hashPassword(password) {
  return bcrypt.hash(password, 3);
}

usersRouter.get("/", async (_req, res, next) => {
  try {
    const usersCursor = usersCollection.find();

    res.send(await usersCursor.toArray());
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/:id", async ({ params: { id } }, res, next) => {
  try {
    const user = await usersCollection.findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/", async ({ body: { username, password } }, res, next) => {
  const DUPLICATE_KEY_ERROR_CODE = 11000;

  try {
    await usersCollection.insertOne({
      username,
      password: await hashPassword(password),
    });

    res.status(201).json({ message: "User was created" });
  } catch (err) {
    if (
      err instanceof MongoServerError &&
      err.code === DUPLICATE_KEY_ERROR_CODE
    ) {
      return res.status(409).json({
        message:
          "Username is already in system. Please choose another username.",
      });
    }

    next(err);
  }
});

usersRouter.put("/:id", async ({ params: { id }, body }, res, next) => {
  try {
    const { username, password } = body;

    const dbResponse = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { username, password: await hashPassword(password) } }
    );

    // im assuming this means the student was not in the system
    if (dbResponse.matchedCount === 0) {
      return res.status(404).json({ message: "User is not in the system" });
    }

    res.json({ message: "User has been updated" });
  } catch (err) {
    next(err);
  }
});

usersRouter.delete("/:id", async ({ params: { id } }, res, next) => {
  try {
    const dbResponse = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // im assuming this means the student was not in the system
    if (dbResponse.deletedCount === 0) {
      return res.status(404).json({ message: "User was not deleted" });
    }

    res.json({ message: "User has been deleted" });
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
