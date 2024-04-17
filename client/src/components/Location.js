import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Location({ loading, setLoading }) {
  const [location, setLocation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
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
      .catch((error) => {
        console.error("Error fetching location:", error);
        setLoading(false);
      });
  }, [id, setLoading]);

  if (loading) {
    return <h4 className="text-center mt-4">Fetching Location...</h4>;
  }

  if (!location) {
    return <div>Error: Location not found</div>;
  }

  const destinations = location.destinations.map((dest) => {
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
    <>
      <section className="min-h-[1200px] flex flex-col items-center justify-center w-full flex-wrap grid-cols-2">
        <h1 className="text-center font-bold text-4xl mt-5">Our Destinations</h1>
        <div className="row mt-6">{destinations}</div>
      </section>
    </>
  );
}
