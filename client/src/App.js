import { Link, Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import Destinations from "./components/Destination";
// import Header from "./components/Header";
import Locations from "./components/Location";
import Home from "./components/Home";
import Destinationsid from "./components/Destinationsid";
import Review from "./components/Review";
// import AddReview from "./components/AddReview";
import CollapsibleExample from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";



function App() {
  return (
    <div className="container">

      <CollapsibleExample/>

       {/* <Header/> */}

       {/* <AddReview/> */}

      <main>

        <Routes>

        <Route path="/locations/:id" element={<Locations />} />
        <Route path="/destinations/:id" element={<Destinationsid /> } />
        <Route path="/" element={<Home/>} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/reviews" element={<Review/>} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />



        </Routes>
          
        
      </main>


      <Footer/>
      
    </div>
  );
}

export default App;



