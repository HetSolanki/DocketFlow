import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../utils/fetchNotes";
import { useState } from "react";
import { createNote, updateNoteState } from "../../utils/CRUD/createNote";

export default function Inbox() {
  const [newNote, setNewNote] = useState("");
  const [oldNote, setOldNote] = useState("");
  const [newNoteValue, setNewNoteValue] = useState("");
  const result = useQuery({
    queryKey: ["notes", newNote, oldNote],
    queryFn: fetchNotes,
  });

  async function handleCreate(e) {
    if (e.key === "Enter") {
      const inputBox = document.querySelector("#noteInput");
      if (inputBox.value !== "") {
        const note = await createNote(inputBox.value);
        setNewNote(await note.json());
        inputBox.value = "";
        inputBox.focus();
      }
    }
  }

  async function updateState(id) {
    const note = await updateNoteState(id);
    setOldNote(await note.json());
  }

  return (
    <>
      <div className="text-2xl font-semibold">Inbox</div>
      <input
        type="text"
        id="noteInput"
        className="border-[1px] border-black rounded px-[10px] py-[6px] font-medium text-lg w-full"
        placeholder="Enter your task here.!"
        onKeyDown={(e) => handleCreate(e)}
      />
      <div className="notes mt-1">
        <div className="Not-Completed">
          <ul>
            {result?.data?.map((note, index) =>
              !note.completed ? (
                <li
                  key={index}
                  className="hover:bg-gray-400/50 p-2 flex items-center gap-x-1"
                >
                  <input
                    type="checkbox"
                    name={note.title}
                    id={note._id}
                    onClick={() => updateState(note._id)}
                  />
                  <input
                    type="text"
                    className="text-lg bg-transparent focus:border-0"
                    value={newNoteValue}
                    onFocus={(e) => e.preventDefault()}
                    onChange={(e) => setNewNoteValue(e.target.value)}
                    // onClick={(e) => e.preventDefault()}
                  />
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
        <div className="Completed mt-[2rem]">
          <h1 className="font-bold text-xl">Completed</h1>
          <ul>
            {result?.data?.map((note, index) =>
              note.completed ? (
                <li
                  key={index}
                  className="hover:bg-gray-400/50 p-2 flex items-center gap-x-1 border-b-[1px] border-black/30"
                >
                  <input
                    type="checkbox"
                    name={note.title}
                    checked="true"
                    id={note._id}
                    onClick={() => updateState(note._id)}
                    className="accent-slate-500"
                  />
                  <span className="text-lg">{note.title}</span>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
