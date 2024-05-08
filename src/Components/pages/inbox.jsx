import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../utils/fetchNotes";
import { useEffect, useState } from "react";
import {
  createNote,
  updateNoteState,
  updateNote,
} from "../../utils/CRUD/Note_Req";
import Description from "./Description";

export default function Inbox() {
  const [newNote, setNewNote] = useState("");
  const [oldNote, setOldNote] = useState("");

  const result = useQuery({
    queryKey: ["notes", newNote, oldNote],
    queryFn: fetchNotes,
  });

  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(result?.data?.data?.[0]);
  }, [result?.data?.data]);

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

  async function handleUpdate(e, id, completed, title) {
    if (e.key === "Enter" || e.type === "change") {
      const note = await updateNote(id, title, completed);
      setNewNote(await note.json());
    }
  }

  return (
    <>
      <div className="container flex gap-x-1rem">
        <div className="inbox flex-grow">
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
                {result?.data?.data?.map((note, index) =>
                  !note.completed ? (
                    <li
                      key={index}
                      className="hover:bg-gray-400/50 p-2 flex items-center gap-x-1"
                      onClick={() => setNote(note)}
                    >
                      <input
                        type="checkbox"
                        name={note.title}
                        id={note._id}
                        defaultChecked={false}
                        onChange={(e) =>
                          handleUpdate(e, note._id, !note.completed)
                        }
                        onClick={() => updateState(note._id)}
                      />
                      <input
                        type="text"
                        className="text-lg bg-transparent border-transparent outline-none"
                        onChange={(e) => e.target.value}
                        defaultValue={note.title}
                        onKeyDown={(e) =>
                          handleUpdate(
                            e,
                            note._id,
                            note.completed,
                            e.target.value
                          )
                        }
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
                {result?.data?.data?.map((note, index) =>
                  note.completed ? (
                    <li
                      key={index}
                      className="hover:bg-gray-400/50 p-2 flex items-center gap-x-1 border-b-[1px] border-black/30"
                    >
                      <input
                        type="checkbox"
                        name={note.title}
                        checked={note.completed}
                        onChange={(e) =>
                          handleUpdate(e, note._id, !note.completed)
                        }
                        id={note._id}
                        onClick={() => updateState(note._id)}
                        className="accent-slate-500"
                      />
                      <input
                        type="text"
                        className="text-lg bg-transparent border-transparent outline-none"
                        onChange={(e) => e.target.value}
                        defaultValue={note.title}
                        onKeyDown={(e) =>
                          handleUpdate(
                            e,
                            note._id,
                            note.completed,
                            e.target.value
                          )
                        }
                      />
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="description w-[30%]">
          <Description note={note} />
        </div>
      </div>
    </>
  );
}
