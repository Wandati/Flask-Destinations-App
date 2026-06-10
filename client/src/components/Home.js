import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ loading, setLoading }) {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/locations")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [setLoading]);
  
const handleClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

  const location = locations.map((loc) => {
    return (
      <div key={loc.id} className="destination-card">
        <img
          src={loc.image_url}
          className="destination-card-image"
          alt={loc.name}
        />

        <div className="px-5 pt-5">
          <p className="text-xs font-semibold uppercase text-[#0b6b2b]">Location</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{loc.name}</h2>
        </div>

        <div className="flex flex-1 flex-col px-5 py-4">
          <p className="text-base leading-7 text-gray-700">{loc.description}</p>
        </div>
        <div className="px-5 pb-5">
          <Link
            className="primary-button w-full sm:w-auto"
            to={`/locations/${loc.id}`}
            onClick={handleClick}
          >
            View destinations
          </Link>
        </div>
      </div>
    );
  });

  return (
     <>
      <section className="w-full py-4 sm:py-8">
        {loading && (
          <h4 className="page-kicker">
            Fetching locations...
          </h4>
        )}
        {error && !loading && (
          <p className="mx-auto max-w-2xl text-center text-red-700">{error}</p>
        )}
        {!loading && (
          <>
           <h1 className="page-title">Explore Locations</h1>
           <p className="page-kicker">
             Start with a region, then drill into the destinations connected to it.
           </p>
           {locations.length > 0 ? (
             <div className="card-grid">{location}</div>
           ) : (
             <div className="surface-panel mx-auto mt-8 max-w-xl p-6 text-center text-slate-600">
               No locations are available yet.
             </div>
           )}
          </>
        )}
      </section>
    </>
  );
}
