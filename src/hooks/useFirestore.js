import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function useFirestore() {
  let getCollection = (colName) => {
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState([]);

    useEffect(() => {
      setLoading(true);
      let ref = collection(db, colName);
      onSnapshot(ref, (docs) => {
        if (docs.empty) {
          setError("no docs found");
          setLoading(false);
        } else {
          let collectionDatas = [];
          docs.forEach((doc) => {
            let document = { id: doc.id, ...doc.data() };
            collectionDatas.push(document);
          });
          setData(collectionDatas);
          setLoading(false);
          setError("");
        }
      });
    }, []);
    return { error, loading, data };
  };

  let getDocument = (colName, id) => {
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState([]);

    useEffect(() => {
      setLoading(true);
      let ref = doc(db, colName, id);
      onSnapshot(ref, (doc) => {
        if (doc.exists) {
          let document = { id: doc.id, ...doc.data() };
          setData(document);
          setLoading(false);
          setError("");
        } else {
          setError("no document found");
          setLoading(false);
        }
      });
    }, [id]);

    return { error, loading, data };
  };

  let addDocument = async (colName, data) => {
    data.date = serverTimestamp();
    let ref = collection(db, colName);
    return addDoc(ref, data);
  };

  let deleteDocument = async (colName, id) => {
    let ref = doc(db, colName, id);
    return deleteDoc(ref);
  };

  let updateDocument = async (colName, id, data, updateDate = true) => {
    if (updateDate) {
      data.date = serverTimestamp();
    }
    let ref = doc(db, colName, id);
    return updateDoc(ref, data);
  };

  return {
    getCollection,
    getDocument,
    addDocument,
    deleteDocument,
    updateDocument,
  };
}
