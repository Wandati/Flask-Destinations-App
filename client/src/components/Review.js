import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section>
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-xl-8 text-center">
          <h3 className="mb-4">Testimonials</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet
            numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum
            quisquam eum porro a pariatur veniam.
          </p>
        </div>
      </div>
      <div className="row mt-3">
        {reviews.map((rev) => (
          <div key={rev.id} className="col-md-4 mb-5 mb-md-0">
            <h5 className="mb-3">{rev.user_id}</h5>
            <p className="px-xl-3">
            <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />{rev.comment}
            </p>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              {[1, 2, 3, 4, 5].map((index) => (
                <li key={index}>
                  {index <= rev.rating ? (
                    <FontAwesomeIcon icon={solidStar} className="text-warning" />
                  ) : (
                    <FontAwesomeIcon icon={regularStar} className="text-warning" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Review;
