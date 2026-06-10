import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "./UserContext";

function Header() {
  const { setUser } = useUser();
  const [open, setOpen] = useState(false);

  function handleLogoutClick(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("id");
    window.location = "/";
  }

  let id = localStorage.getItem("id");
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-[#e7f4dc] text-[#0b6b2b]"
        : "text-slate-700 hover:bg-slate-100 hover:text-[#0b6b2b]"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-bold leading-tight text-[#0b6b2b] sm:text-2xl"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#0b6b2b] text-base text-white">
              DK
            </span>
            DestinationKenya
          </Link>
        </div>

        <button
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-2 lg:flex">
          <NavLink to="/locations" className={navClass}>
            Locations
          </NavLink>
          <NavLink to="/destinations" className={navClass}>
            Destinations
          </NavLink>
          {!id ? (
            <>
              <NavLink
                className={navClass}
                to="/sign-in"
              >
                Log in
              </NavLink>
              <Link
                className="primary-button"
                to="/sign-up"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <NavLink
                to="/reviews"
                className={navClass}
              >
                My Reviews
              </NavLink>
              <Link to="/logout" onClick={(e) => handleLogoutClick(e)}>
                <button className="secondary-button" type="button">
                  Logout
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>

      {open && (
        <nav className="border-t border-slate-200 px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            <NavLink to="/locations" className={navClass} onClick={() => setOpen(false)}>
              Locations
            </NavLink>
            <NavLink to="/destinations" className={navClass} onClick={() => setOpen(false)}>
              Destinations
            </NavLink>
            {!id ? (
              <>
                <NavLink to="/sign-in" className={navClass} onClick={() => setOpen(false)}>
                  Log in
                </NavLink>
                <Link to="/sign-up" className="primary-button" onClick={() => setOpen(false)}>
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <NavLink to="/reviews" className={navClass} onClick={() => setOpen(false)}>
                  My Reviews
                </NavLink>
                <Link to="/logout" className="secondary-button" onClick={(e) => handleLogoutClick(e)}>
                  Logout
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
