import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
});

const Note = mongoose.model("Note", noteSchema);

export { Note };
