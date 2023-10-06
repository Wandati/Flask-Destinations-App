import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the useUser hook


function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get the setUser function from UserContext


  useEffect(() => {
    // Send a request to log the user out on the server-side
    fetch("http://127.0.0.1:5555/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 204) {
          // Clear user session or JWT token on the client-side
          // You can use cookies, local storage, or session storage for this purpose
          // For example, if you're using cookies:
          document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          
          // Redirect the user to the login page
          navigate("/sign-in");
        } else {
          // Handle logout error, e.g., unauthorized action
          console.error("Logout error:", res.status);
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Logout error:", error);
      });
  }, [navigate]);

  function handleLogoutClick(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("id");
    window.location = "/";
  }
let id = localStorage.getItem("id")
console.log(id)
  return (
    <div>
      {id != null && (
        <button onClick={(e) => handleLogoutClick(e)}>Logout</button>

      )}
    </div>
  );
}

export default Logout;
