import { serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { useParams } from "react-router-dom";

export default function NoteForm({ type = "create", setEditeNote, editeNote }) {
  let [body, setBody] = useState("");
  let { addDocument, updateDocument } = useFirestore();
  let { id } = useParams();
  let addNote = async (e) => {
    e.preventDefault();

    if (type === "create") {
      let data = {
        body,
        bookUid: id,

        date: serverTimestamp(),
      };
      await addDocument("notes", data);
    } else {
      editeNote.body = body;
      await updateDocument("notes", editeNote.id, editeNote);
      setEditeNote(null);
    }

    setBody("");
  };

  useEffect(() => {
    if (type === "update") {
      setBody(editeNote.body);
    }
  }, [type]);

  return (
    <div className="mt-3">
      <form action="" onSubmit={addNote}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="5"
          className="bg-gray-200 w-full p-3"
        ></textarea>
        <div className="space-x-3">
          <button
            type="submit"
            className="px-2 py-2 rounded-lg bg-primary text-white font-bold"
          >
            {type === "create" ? "Add" : "Update"} Note
          </button>

          {type === "update" && (
            <button
              onClick={() => setEditeNote(null)}
              className="px-2 py-2 rounded-lg border border-black text-primary font-bold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
