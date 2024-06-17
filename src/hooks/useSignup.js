import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

export default function useSignup() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let signup = async (email, password) => {
    try {
      setLoading(true);
      let res = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setError("");
      return res.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return { error, loading, signup };
}
