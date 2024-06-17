import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navar from "../../components/Navar";
import useTheme from "../../hooks/useTheme";

export default function Layout() {
  let { isDark } = useTheme();
  useEffect(() => {
    let body = document.body;
    if (isDark) {
      body.classList.add("bg-dbg");
    } else {
      body.classList.remove("bg-dbg");
    }
  }, [isDark]);

  return (
    <div className={isDark ? "bg-dbg" : "bg-white"}>
      <Navar />
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
