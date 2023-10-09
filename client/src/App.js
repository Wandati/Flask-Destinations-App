import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Destinations from "./components/Destination";
import Locations from "./components/Location";
import Home from "./components/Home";
import Destinationsid from "./components/Destinationsid";
import Review from "./components/Review";
// import CollapsibleExample from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from './components/Header'
import Logout from "./components/Logout";
import { UserProvider } from "./components/UserContext";
// import HomePage from "./components/Homepage"
import HomePage from "./components/HomePage";


function App() {
  const [user, setUser] = useState(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/checkuser/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  return (
    
    <UserProvider value={user}>
      <div className='max-w-[1440px] mx-auto bg-white'>
        {/* <CollapsibleExample /> */}
        <Header/>
        
        <main>
          <Routes>
            <Route path= "/" element={<HomePage/>}/>
            <Route path="/locations/:id" element={<Locations />} />
            <Route path="/destinations/:id" element={<Destinationsid />} />
            <Route path="/locations" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
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
