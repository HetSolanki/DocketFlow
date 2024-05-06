export const createNote = async (noteTitle) => {
  const note = await fetch("http://localhost:3001/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: noteTitle,
    }),
  });

  return note;
};

export const updateNoteState = async (id) => {
  const note = await fetch(`http://localhost:3001/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return note;
};
