import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Location({ loading, setLoading }) {
  const [location, setLocation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/locations/${id}`)
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
      .catch((error) => {
        console.error("Error fetching location:", error);
        setLoading(false);
      });
  }, [id, setLoading]);

  if (loading) {
    return <h4 className="mt-4 text-center text-slate-600">Fetching Location...</h4>;
  }

  if (!location) {
    return <div className="py-10 text-center text-red-700">Error: Location not found</div>;
  }

  const destinations = location.destinations.map((dest) => {
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
      <section className="w-full py-4 sm:py-8">
        <h1 className="page-title">{location.name}</h1>
        <p className="page-kicker">{location.description}</p>
        {location.destinations.length > 0 ? (
          <div className="card-grid">{destinations}</div>
        ) : (
          <div className="surface-panel mx-auto mt-8 max-w-xl p-6 text-center text-slate-600">
            No destinations have been added for this location yet.
          </div>
        )}
      </section>
    </>
  );
}
