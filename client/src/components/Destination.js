import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Destinations() {
  const [destinations, setDestinations] = useState([]);



  useEffect(() => {
    fetch("http://127.0.0.1:5555/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, []);


  const destination = destinations.map((dest) => {
    return (
      <div key={dest.id} className="col-6">
        <div className="card ">
          <img
            src={dest.image_url}
            className="card-img-top img-fluid"
            alt={dest.name}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{dest.name}</h5>
          <p className="card-text">{dest.description} </p>
          <button className="btn btn-dark">
            <Link to={`/destinations/${dest.id}`}>Click to view the Destination details</Link>
          </button>
        </div>
      </div>
    );
  });


  
  return (
    <>
      <h1 className="text-center ">Our Destinations</h1>
      <div className="container">
        <div className="row mt-3">{destination}</div>
      </div>
    </>
  );
}