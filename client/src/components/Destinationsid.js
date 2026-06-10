import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt as halfStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import AddReview from "./AddReview";

export default function Destinationsid({ loading, setLoading }) {
  const [destination, setDestination] = useState(null);
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/destinations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDestination(data);
        setLoading(false); 
        // console.log(data);// Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Handle errors and set loading to false
      });
  }, [id, setLoading]);

  if (!destination) {
    return <h4 className="mt-4 text-center text-slate-600">Fetching Destination...</h4>;
  }

  const reviews = destination.reviews.map((rev) => {
    const rating = rev.rating;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FontAwesomeIcon key={i} icon={solidStar} className="text-amber-400" />
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <FontAwesomeIcon key={i} icon={halfStar} className="text-amber-400" />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={regularStar}
            className="text-amber-400"
          />
        );
      }
    }

    return (
      <div key={rev.id} className="surface-panel p-4">
        <h5 className="mb-3 text-lg font-bold text-slate-900">
          {rev.username}
        </h5>
        <p className="break-words text-slate-700">
          <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />
          {rev.comment}
        </p>
        <ul className="mt-3 flex gap-1">
          {stars}
        </ul>
      </div>
    );
  });

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    {loading && <p className="text-center text-slate-600">Fetching Destination...</p>}

    <section className="w-full py-4 sm:py-8">
    {!loading && destination && (
      <>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-lg bg-slate-900 shadow-xl">
          <img
            src={destination.image_url}
            className="h-[360px] w-full object-cover sm:h-[520px]"
            alt={destination.name}
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-sm font-semibold uppercase text-[#0b6b2b]">
            Destination
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            {destination.name}
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-700">
            {destination.description}
          </p>
          <div className="mt-6">
            <AddReview show={showModal} handleClose={handleCloseModal} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#0b6b2b]">
              Traveler feedback
            </p>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Reviews
            </h2>
          </div>
          <p className="text-sm text-slate-500">{destination.reviews.length} total</p>
        </div>

        {destination.reviews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{reviews}</div>
        ) : (
          <div className="surface-panel p-6 text-center text-slate-600">
            No reviews yet. Add the first one.
          </div>
        )}
      </div>
      </>
    )}
    </section>
    </>
  );
}
