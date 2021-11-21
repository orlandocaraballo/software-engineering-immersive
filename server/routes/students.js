import express from "express";
import { studentsCollection, client } from "../db.js";
import { ObjectId } from "mongodb";

const studentsRouter = express.Router();

studentsRouter.get("/", async (req, res, next) => {
  try {
    await client.connect();
    const studentsCursor = studentsCollection.find();
    const students = await studentsCursor.toArray();

    res.json(students);
  } catch (err) {
    next(err);
  }
});

studentsRouter.get("/:id", async ({ params: { id } }, res, next) => {
  try {
    const student = await studentsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!student) {
      return res
        .status(404)
        .json({ message: `Student with id ${id} not found` });
    }

    res.json(student);
  } catch (err) {
    next(err);
  }
});

studentsRouter.post("/", async ({ body }, res, next) => {
  try {
    const { name, gender, knownFor, github, slackHandle } = body;

    await studentsCollection.insertOne({
      name,
      gender,
      knownFor,
      github,
      slackHandle,
    });

    res.status(201).json({ message: "Student was created" });
  } catch (err) {
    next(err);
  }
});

studentsRouter.put("/:id", async ({ params: { id }, body }, res, next) => {
  try {
    const { name, gender, knownFor, github, slackHandle } = body;

    const dbResponse = await studentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, gender, knownFor, github, slackHandle } }
    );

    // im assuming this means the student was not in the system
    if (dbResponse.modifiedCount === 0) {
      return res.status(404).json({ message: "Student was not updated" });
    }

    res.json({ message: "Student has been updated" });
  } catch (err) {
    next(err);
  }
});

studentsRouter.delete("/:id", async ({ params: { id } }, res, next) => {
  try {
    const dbResponse = await studentsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // im assuming this means the student was not in the system
    if (dbResponse.deletedCount === 0) {
      return res.status(404).json({ message: "Student was not deleted" });
    }

    res.json({ message: "Student has been deleted" });
  } catch (err) {
    next(err);
  }
});

export default studentsRouter;
