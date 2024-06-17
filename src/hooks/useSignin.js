import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

export default function useSignin() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let signIn = async (email, password) => {
    try {
      setLoading(true);
      let res = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setError("");
      return res.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return { error, loading, signIn };
}
