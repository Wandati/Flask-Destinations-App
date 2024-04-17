import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://destinations-server-app.onrender.com/destinations")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
        setLoading(false); // Handle errors and set loading to false
      });
  }, []);

  const destination = destinations.map((dest) => {
    return (
      <div
        key={dest.id}
        className="max-w-4xl rounded overflow-hidden shadow-lg mt-6"
      >
        <img
          src={dest.image_url}
          className="card-img-top img-fluid w-full h-4/5"
          alt={dest.name}
        />

        <div className="font-bold text-xl mb-2 ml-6 mt-8"> {dest.name}</div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">{dest.description}</p>
        </div>
        <div className="flex justify-center mb-2">
          <span className="inline-block bg-[#007423] rounded-full px-3 py-1 text-sm text-white font-semibold text-[#1a3813] mr-2 mb-2 hover:bg-[#068f2f]">
            <Link to={`/destinations/${dest.id}`}>
              Click to view the Destination Details
            </Link>{" "}
          </span>
        </div>
      </div>
    );
  });

  return (
    {loading ? (
      <p className="text-center">Fetching Data...</p>
    ) : (
      <>
    <section className="min-h-[1200px] flex flex-col items-center justify-center w-full flex-wrap grid-cols-2">
      <h1 className="text-center font-bold text-4xl mt-5">Our Destinations</h1>
        <div className="row mt-6">{destination}</div>
    </>
      )}
    </section>
  );
}
