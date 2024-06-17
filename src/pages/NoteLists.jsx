import React, { useState } from "react";
import pencilIcon from "../assets/pencil.svg";
import trashIcon from "../assets/trash.svg";
import moment from "moment";
import useFirestore from "../hooks/useFirestore";
import { useParams } from "react-router-dom";
import NoteForm from "./NoteForm";
export default function NoteLists() {
  let { id } = useParams();
  let { getCollection, deleteDocument } = useFirestore();
  let { error, loading, data: notes } = getCollection("notes");
  let [editeNote, setEditNote] = useState(null);

  let deleteNote = async (id) => {
    await deleteDocument("notes", id);
  };

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {!!notes.length &&
        notes.map((note) => (
          <div className="font-bold mt-2 p-3 border border-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img
                  src="https://preview.redd.it/what-exactly-is-the-problem-with-joaquin-phoenix-joker-v0-hvg746l8kumb1.jpg?width=1080&crop=smart&auto=webp&s=3bbaf677d2f8dc9fd4bbeec1470decd1c8c966c1"
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h1>Kyaw Zin Tun</h1>
                  <h2 className="text-gray-400">
                    {moment(note?.date?.seconds * 1000).fromNow()}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-1 cursor-pointer">
                <img
                  src={pencilIcon}
                  alt=""
                  onClick={() => setEditNote(note)}
                />
                <img
                  src={trashIcon}
                  alt=""
                  onClick={() => deleteNote(note.id)}
                />
              </div>
            </div>

            <div>
              {editeNote?.id !== note.id && note.body}
              <div>
                {editeNote?.id === note.id && (
                  <NoteForm
                    type="update"
                    setEditeNote={setEditNote}
                    editeNote={editeNote}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
