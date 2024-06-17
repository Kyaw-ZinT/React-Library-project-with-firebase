import React, { useContext } from "react";
import lightIcon from "../assets/light.svg";
import darkIcon from "../assets/dark.svg";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useSignout from "../hooks/useSignout";
import { AuthContext } from "../contexts/AuthContext";

export default function Navar() {
  let { isDark, changeTheme } = useTheme();
  let navigate = useNavigate();
  let { logout } = useSignout();
  let logoutUser = async () => {
    await logout();
    navigate("/login");
  };

  let { user } = useContext(AuthContext);

  return (
    <div>
      <nav
        className={`border border-b-1 py-3 ${isDark ? "bg-dbg" : "bg-white"}`}
      >
        <ul className="flex items-center justify-between max-w-6xl mx-auto">
          <li>
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 outline-none"
            />
          </li>
          <Link to="" className="flex items-center gap-1 -ml-32 ">
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
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>
            <h1 className="text-xl font-bold text-primary">Book Form</h1>
          </Link>
          <li className="flex items-center gap-3">
            <Link
              to="/create"
              className="flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-lg"
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
              <p className="font-semibold text-lg">Create Form</p>
            </Link>

            <div>
              <img
                className="inline-block h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>

            <div>
              {isDark && (
                <img
                  src={lightIcon}
                  alt=""
                  onClick={(e) => changeTheme("light")}
                />
              )}

              {!isDark && (
                <img
                  src={darkIcon}
                  alt=""
                  onClick={(e) => changeTheme("dark")}
                />
              )}
            </div>

            <div className="space-x-3">
              {!user && (
                <>
                  <Link
                    to={`/register`}
                    className="px-2 py-2 rounded-lg  border boreder-black text-sm font-bold"
                  >
                    Register
                  </Link>

                  <Link
                    to={`/login`}
                    className="px-2 py-2 rounded-lg text-white bg-primary text-sm font-bold"
                  >
                    Login
                  </Link>
                </>
              )}

              {!!user && (
                <button
                  onClick={logoutUser}
                  className="px-2 py-2 rounded-lg text-white bg-red-500 text-sm font-bold"
                >
                  Logout
                </button>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
