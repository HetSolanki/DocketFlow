export const fetchNotes = async () => {
  console.log("Called");
  const res = await fetch("http://localhost:3001/api/notes");
  return await res.json();
};
