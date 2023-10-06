

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Locations() {
  const { id } = useParams(); 
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/locations/${id}`)

      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setLocation(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !location) {
    return <div>Error: Location not found</div>;
  }

  const destinations = location.destinations.map((dest) => (
    <div key={dest.id} className="col-12">
      <div className="card">
        <img
          src={dest.image_url}
          className="card-img-top img-fluid"
          alt={dest.name}
        />
        <div className="card-body">
          <h5 className="card-title">{dest.name}</h5>
          <p className="card-text">{dest.description}</p>
          <button className="btn btn-dark">
            <Link to={`/destinations/${dest.id}`}>Click to view the Destination Details</Link>
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <h1 className="text-center">{location.name}</h1>
      <div className="container">
        <div className="row mt-3">{destinations}</div>
      </div>
    </>
  );
}
