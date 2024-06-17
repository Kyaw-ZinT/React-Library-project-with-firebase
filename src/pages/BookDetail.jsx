import React from "react";
import { useParams } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import useTheme from "../hooks/useTheme";
import NoteForm from "./NoteForm";
import NoteLists from "./NoteLists";

export default function BookDetail() {
  let { id } = useParams();
  let { isDark } = useTheme();

  let { getDocument } = useFirestore();
  let { error, loading, data: book } = getDocument("books", id);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>loading...</p>}
      {book && (
        <>
          <div
            key={book.id}
            className={`grid grid-cols-2 mt-3 ${isDark ? "text-white" : ""}`}
          >
            <div className="w-[400px] h-[300px]">
              <img
                src={book.cover}
                alt=""
                className="w-full h-full rounded-lg"
              />
            </div>

            <div className=" space-y-3 text-1xl font-bold ">
              <h1>{book.title}</h1>
              <h2>{book.description}</h2>
              <div>
                {book.categories &&
                  book.categories.map((category) => (
                    <span className="px-2 py-1 rounded-full bg-primary m-1  text-sm text-white">
                      {category}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-xl text-primary text-center font-bold">
              My Notes
            </h1>
            <NoteForm />
            <NoteLists />
          </div>
        </>
      )}
    </>
  );
}
