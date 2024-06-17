import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AuthContext } from "../contexts/AuthContext";

export default function BookForm() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newCategories, setNewCategories] = useState("");
  let [categories, setCategories] = useState(["html", "css"]);
  let navigate = useNavigate();
  let [isEdit, setIsEdit] = useState(false);
  let { id } = useParams();
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState("");
  let { user } = useContext(AuthContext);

  let { addDocument, updateDocument } = useFirestore();

  let addCategories = () => {
    if (newCategories && categories.includes(newCategories)) {
      setNewCategories("");
      return;
    }

    setCategories((prev) => [newCategories, ...prev]);
    setNewCategories("");
  };

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      let ref = doc(db, "books", id);
      getDoc(ref).then((doc) => {
        if (doc.exists) {
          let { title, description, categories } = doc.data();
          setTitle(title);
          setDescription(description);
          setCategories(categories);
        }
      });
    } else {
      setIsEdit(false);
      setTitle("");
      setDescription("");
      setCategories([]);
    }
  }, []);

  let handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

  let handleInImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  useEffect(() => {
    if (file) {
      handleInImage(file);
    }
  }, [file]);

  let addData = async (e) => {
    e.preventDefault();
    let uniqueFileName = Date.now().toString() + "_" + file.name;
    let path = "/users/" + user.uid + "/" + uniqueFileName;
    let stroageReference = ref(storage, path);
    await uploadBytes(stroageReference, file);
    let url = await getDownloadURL(stroageReference);
    let data = {
      title,
      description,
      categories,
      cover: url,
    };

    if (isEdit) {
      await updateDocument("books", id, data);
    } else {
      await addDocument("books", data);
    }

    navigate("/");
  };

  let { isDark } = useTheme();

  return (
    <div className="mt-10 flex justify-center">
      <form className="w-full max-w-lg" onSubmit={addData}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  ${
                isDark ? "text-white" : ""
              }`}
              for="grid-password"
            >
              Book Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Book Title"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  ${
                isDark ? "text-white" : ""
              }`}
              for="grid-password"
            >
              Book Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Book Description"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  ${
                isDark ? "text-white" : ""
              }`}
              for="grid-password"
            >
              Book Categories
            </label>

            <div className="flex items-center gap-2">
              <input
                value={newCategories}
                onChange={(e) => setNewCategories(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="Book Categories"
              />

              <div>
                <button
                  className="px-1 py-1 rounded-lg bg-primary mb-3 text-white"
                  type="button"
                  onClick={addCategories}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div>
            {categories.map((c) => (
              <span
                key={c}
                className="px-2 py-1 rounded-full bg-primary text-white m-1 text-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full px-3 my-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  ${
              isDark ? "text-white" : ""
            }`}
            for="grid-password"
          >
            Book Title
          </label>
          <input type="file" onChange={handlePhotoChange} />
          {!!preview && (
            <img
              src={preview}
              alt=""
              className="my-3 object-cover"
              width={500}
              height={600}
            />
          )}
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-3 rounded-lg bg-primary text-white flex items-center justify-center gap-2 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="font-semibold text-lg">
              {isEdit ? "Update" : "Create"} Form
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}
