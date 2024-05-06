import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Note = mongoose.model("Note", noteSchema);

export { Note };
