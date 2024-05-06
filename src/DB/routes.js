import { Router } from "express";
import { Note } from "./Schema/notes.js";

const router = Router();

router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (e) {
    res.json({ message: e });
  }
});

router.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.json({ message: "Enter Valid Id" });
  }
});

router.put("/notes/:id", async (req, res) => {
  try {
    const noteTemp = await Note.findById(req.params.id);
    const note = await Note.findByIdAndUpdate(req.params.id, {
      completed: !noteTemp.completed,
    });

    res.json(note);
  } catch (error) {
    res.json({ message: "Enter Valid Id" });
  }
});

router.post("/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.json(note.toJSON());
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
