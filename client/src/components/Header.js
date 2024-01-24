
import React from "react";

import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

function Header() {
  const { setUser } = useUser();

  function handleLogoutClick(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("id");
    window.location = "/";
  }

  let id = localStorage.getItem("id");

  return (
    <header className="py-6 border-b">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <Link
            to="/"
            className="text-2xl font-semibold leading-none mb-2 sm:mb-0 text-[#007423]"
          >
            DestinationKenya
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/locations" className="hover:text-[#0dcc46] transition">
            Locations
          </Link>
          <Link to="/destinations" className="hover:text-[#0dcc46] transition">
            Destinations
          </Link>
          {!id ? (
            <>
              <Link
                className="hover:text-[#0dcc46] transition"
                to="/sign-in"
              >
                Log in
              </Link>
              <Link
                className="bg-[#007423] hover:bg-[#0dcc46] text-white px-4 py-3 rounded-lg transition"
                to="/sign-up"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/reviews"
                className="hover:text-[#0dcc46] transition"
              >
                My Reviews
              </Link>
              <Link to="/logout" className="list">
                <button onClick={(e) => handleLogoutClick(e)}>
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
