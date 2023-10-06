import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function Home() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);


  const location = locations.map((loc) => {
    return (
      <div key={loc.id} className="col-12">
        <div className="card ">
          <img
            src={loc.image_url}
            className="card-img-top img-fluid"
            alt={loc.name}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{loc.name}</h5>
          <p className="card-text">{loc.description} </p>
          <button className="btn btn-dark">
          <Link to={`/locations/${loc.id}`}>Click to view destinations</Link>

          </button>
        </div>
      </div>
    );
  });



  return (
    <>
      <h1 className="text-center ">Our Locations</h1>
      <div className="container">
        <div className="row mt-3">{location}</div>
      </div>
    </>
  );
}