import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

export default function useSignout() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let logout = async () => {
    try {
      setLoading(true);
      let res = await signOut(auth);
      setLoading(false);
      setError("");
      return res.user;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return { error, loading, logout };
}
