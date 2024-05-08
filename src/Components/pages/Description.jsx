import { updateNote } from "../../utils/CRUD/Note_Req";

export default function Description({ note }) {
  async function handleUpdate(e, noteParam, description) {
    if (e.key === "Enter" || e.type === "change") {
      console.log("called");
      await updateNote(
        noteParam._id,
        noteParam.title,
        noteParam.completed,
        description
      );
    }
  }
  return (
    <>
      {console.log(note?.description)}
      <div className="p-[1rem]">
        <p className="text-2xl font-semibold">{note?.title}</p>
        <input
          type="text"
          placeholder="Description"
          className="outline-none"
          onChange={(e) => e.target.value}
          defaultValue={note?.description}
          onKeyDown={(e) => handleUpdate(e, note, e.target.value)}
        />
      </div>
    </>
  );
}
