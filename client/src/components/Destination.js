import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/destinations")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
        setLoading(false); // Handle errors and set loading to false
      });
  }, [setLoading]);

  const destination = destinations.map((dest) => {
    return (
      <div key={dest.id} className="destination-card">
        <img
          src={dest.image_url}
          className="destination-card-image"
          alt={dest.name}
        />

        <div className="px-5 pt-5">
          <p className="text-xs font-semibold uppercase text-[#0b6b2b]">Destination</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{dest.name}</h2>
        </div>
        <div className="flex flex-1 flex-col px-5 py-4">
          <p className="text-base leading-7 text-gray-700">{dest.description}</p>
        </div>
        <div className="px-5 pb-5">
          <Link
            className="primary-button w-full sm:w-auto"
            to={`/destinations/${dest.id}`}
          >
            View details
          </Link>
        </div>
      </div>
    );
  });

  return (
   <>
      {loading && (
         <h4 className="page-kicker">Fetching destinations...</h4>
      )}
      <section className="w-full py-4 sm:py-8">
        {!loading && (
          <>
            <h1 className="page-title">Explore Destinations</h1>
            <p className="page-kicker">
              Compare places, scan descriptions, and open details for reviews.
            </p>
            {destinations.length > 0 ? (
              <div className="card-grid">{destination}</div>
            ) : (
              <div className="surface-panel mx-auto mt-8 max-w-xl p-6 text-center text-slate-600">
                No destinations are available yet.
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
