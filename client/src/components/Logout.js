import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 204) {
          document.cookie =
            "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          navigate("/sign-in");
        } else {
          console.error("Logout error:", res.status);
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }, [navigate]);

  function handleLogoutClick(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("id");
    window.location = "/";
  }
  let id = localStorage.getItem("id");
  console.log(id);
  return (
    <div>
      {id != null && (
        <button onClick={(e) => handleLogoutClick(e)}>Logout</button>
      )}
    </div>
  );
}

export default Logout;
