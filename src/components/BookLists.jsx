import React from "react";
import { Link } from "react-router-dom";
import pencilIcon from "../assets/pencil.svg";
import trashIcon from "../assets/trash.svg";

import useTheme from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";

export default function BookLists() {
  let deletePost = async (e, id) => {
    e.preventDefault();

    await deleteDocument("books", id);
  };

  let { isDark } = useTheme();

  let { getCollection, deleteDocument } = useFirestore();

  let { error, loading, data: books } = getCollection("books");

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>loading..</p>}
      {!!books && (
        <div>
          <div className="grid grid-cols-4 mt-5 gap-3 ">
            {books.map((b) => (
              <Link
                to={`/books/${b.id}`}
                className={`p-3 border border-1 ${
                  isDark ? "border-primary text-white" : ""
                }`}
                key={b.id}
              >
                <div>
                  <img src={b.cover} alt="" />
                </div>
                <div className="mt-3 space-y-2 font-semibold text-lg">
                  <h1>{b.title}</h1>
                  <p>{b.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap max-w-40">
                      {b.categories.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-1 rounded-full bg-primary text-white m-1 text-sm"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <Link to={`/edit/${b.id}`}>
                        <img src={pencilIcon} alt="" />
                      </Link>

                      <img
                        src={trashIcon}
                        alt=""
                        onClick={(e) => deletePost(e, b.id)}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
