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

export default function Destinationsid({loading,setLoading}) {
  const [destination, setDestination] = useState(null);
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://destinations-server-app.onrender.com/destinations/${id}`)
      .then((res) => res.json())
      .then((data) => setDestination(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!destination) {
    // setLoading(false);
    // return <div>Loading...</div>;
    console.log("null")
  }

  const reviews = destination.reviews.map((rev) => {
    const rating = rev.rating;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FontAwesomeIcon key={i} icon={solidStar} className="text-warning" />
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <FontAwesomeIcon key={i} icon={halfStar} className="text-warning" />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={regularStar}
            className="text-warning"
          />
        );
      }
    }

    return (
      <div key={rev.id} className="col-md-4 mb-5 mb-md-0">
        <h5 className="font-bold text-2xl text-[#193d11] my-6">
          {rev.username}
        </h5>
        <p className="px-xl-3">
          <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />
          {rev.comment}
        </p>
        <ul className="list-unstyled d-flex justify-content-center mb-0">
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
    {loading && (
      <p> fetching Destination...</p>
    )}

    <section className=" min-h-[1200px] flex flex-col items-center  w-full mt-10">
    {!loading && destination && (
      <>
      <div className="font-bold text-4xl mb-2 ml-6 mt-8">
        {" "}
        {destination.name}
      </div>
      <div className="ounded overflow-hidden shadow-lg max-w-2xl ">
        <img
          src={destination.image_url}
          className="card-img-top img-fluid"
          alt={destination.name}
        />

        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">{destination.description}</p>
        </div>

        <div>
          <h5 className="font-bold text-3xl text-[#193d11] my-6 text-center">
            Reviews
          </h5>

          <div className="mx-6">{reviews}</div>

          <AddReview show={showModal} handleClose={handleCloseModal} />
        </div>
      </div>
      </>
    )}
    </section>
    </>
  );
}
