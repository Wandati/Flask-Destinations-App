import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Destinations from "./components/Destination";
import Location from "./components/Location";
import Home from "./components/Home";
import Destinationsid from "./components/Destinationsid";
import Review from "./components/Review";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import Logout from "./components/Logout";
import { UserProvider } from "./components/UserContext";
import HomePage from "./components/HomePage";

function App() {
  const [user, setUser] = useState(null);
  const id = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setUser(null);
      return;
    }

    fetch(`/api/checkuser/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((userData) => {
        setUser(userData);
      });
  }, [id]);

  return (
    <UserProvider value={user}>
      <div className="flex min-h-screen flex-col bg-white text-slate-900">
        <Header />

        <main className="page-shell flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations/:id" element={<Location loading={loading} setLoading={setLoading}/>} />
            <Route path="/destinations/:id" element={<Destinationsid loading={loading} setLoading={setLoading}/>} />
            <Route path="/locations" element={<Home loading={loading} setLoading={setLoading} />} />
            <Route path="/destinations" element={<Destinations loading={loading} setLoading={setLoading}/>} />
            <Route path="/reviews" element={<Review />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
