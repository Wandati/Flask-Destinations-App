import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Locations() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state on each fetch
    fetch(`https://destinations-server-app.onrender.com/locations/${id}`)
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
        setError(err.message); // Set error message to display
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Fetching data...</div>;
  }

  if (error || !location) {
    return <div>Error: {error || "Location not found"}</div>;
  }

  const destinations = location.destinations.map((dest) => (
    <div
      key={dest.id}
      className="max-w-2xl rounded overflow-hidden shadow-lg mt-6"
    >
      <img src={dest.image_url} className="w-full" alt={dest.name} />

      <div className="font-bold text-xl mb-2 ml-6 mt-8"> {dest.name}</div>

      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{dest.description}</p>
      </div>
      <div>
        <span className="inline-block bg-[#007423] rounded-full px-3 py-1 text-sm text-white font-semibold text-[#1a3813] mr-2 mb-2 hover:bg-[#068f2f]">
          <Link to={`/destinations/${dest.id}`}>
            Click to view the Destination Details
          </Link>{" "}
        </span>
      </div>
    </div>
  ));

  return (
    <section className="min-h-[1200px] flex flex-col items-center justify-center w-full">
      <h1 className="text-center font-bold text-4xl mt-5">{location.name}</h1>

      <div className="mt-6">{destinations}</div>
    </section>
  );
}
