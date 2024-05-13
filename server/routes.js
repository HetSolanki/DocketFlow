import { Router } from "express";
import { Note } from "./Schema/notes.js";
import { body, validationResult } from "express-validator";

const router = Router();

router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json({ data: notes });
  } catch (e) {
    res.json({ message: e });
  }
});

router.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json({ data: note });
  } catch (error) {
    res.json({ message: "Enter Valid Id" });
  }
});

router.put(
  "/notes/:id",
  body("title").optional(),
  body("completed").optional(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.json({ data: errors.array() });
      }
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          completed: req.body.completed,
          description: req.body.description,
        },
        { new: true }
      );

      res.json({ data: updatedNote });
    } catch (error) {
      res.json({ message: "Enter Valid Id" });
    }
  }
);

router.post("/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.json(note.toJSON());
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
