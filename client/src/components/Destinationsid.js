import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt as halfStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import AddReview from "./AddReview"; // Import the AddReview component

export default function Destinationsid() {
  const [destination, setDestination] = useState(null);
  const { id } = useParams(); // Access 'id' from the route parameters

  // State for managing the modal visibility
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/destinations/${id}`)
      .then((res) => res.json())
      .then((data) => setDestination(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!destination) {
    return <div>Loading...</div>;
  }

  const reviews = destination.reviews.map((rev) => {
    const rating = rev.rating; // Assuming rating is a number from 1 to 5

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
            <h5 className="mb-3">{rev.username}</h5>
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

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h5 className="card-title">{destination.name}</h5>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6">
            <div className="card">
              <img
                src={destination.image_url}
                className="card-img-top img-fluid"
                alt={destination.name}
              />
              <div className="card-body">
                <p className="card-text">{destination.description}</p>
                <h5 className="card-title">Reviews</h5>
                <div>{reviews}</div>
                {/* <button className="btn btn-dark" onClick={handleOpenModal}>
                  Add a Review
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AddReview modal */}
      <AddReview show={showModal} handleClose={handleCloseModal} />
    </>
  );
}
