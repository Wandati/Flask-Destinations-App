import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  const location = locations.map((loc) => {
    return (
      <div
        key={loc.id}
        className="max-w-4xl rounded overflow-hidden shadow-lg mt-6 "
      >
        <img
          src={loc.image_url}
          className="card-img-top img-fluid w-full h-4/5	"
          alt={loc.name}
        />

        <div className="font-bold text-xl mb-2 ml-6 mt-8"> {loc.name}</div>

        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">{loc.description}</p>
        </div>
        <div className="flex justify-center mb-2">
          <span className="inline-block bg-[#007423] rounded-full px-3 py-1 text-sm text-white font-semibold text-[#1a3813]mr-2 mb-2 hover:bg-[#068f2f] ">
            <Link to={`/locations/${loc.id}`}>Click to view Destinations</Link>{" "}
          </span>
        </div>
      </div>
    );
  });

  return (
    <section className=" min-h-[1200px] flex flex-col items-center justify-center w-full flex-wrap grid-cols-2">
      <h1 className="text-center font-bold text-4xl mt-5">Our Locations</h1>

      <div className="row mt-3">{location}</div>
    </section>
  );
}
