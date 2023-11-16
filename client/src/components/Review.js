import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

function Review() {
  const [reviews, setReviews] = useState([]);
  const user = localStorage.getItem("id");

  const updateComment = (reviewId, updatedComment) => {
    fetch(`http://127.0.0.1:5555/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: updatedComment }),
    })
      .then((res) => {
        if (res.status === 200) {
          const updatedReviews = reviews.map((rev) => {
            if (rev.id === reviewId) {
              return { ...rev, comment: updatedComment };
            }
            return rev;
          });
          setReviews(updatedReviews);
        } else {
          console.error("Failed to update comment");
        }
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const deleteComment = (reviewId) => {
    fetch(`http://127.0.0.1:5555/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          const updatedReviews = reviews.filter((rev) => rev.id !== reviewId);
          setReviews(updatedReviews);
        } else {
          console.error("Failed to delete comment");
        }
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:5555/reviews/${user}`)
        .then((res) => {
          if (res.status === 404) {
            alert("No reviews available.");
            return [];
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setReviews(data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, [user]);

  return (
    <section className=" min-h-[1200px] flex flex-col items-center w-full mx-10">
      <div className="flex flex-wrap gap-8">
        {reviews.map((rev) => (
          <div key={rev.id} className="">
            <h2 className="font-bold text-2xl text-[#193d11] my-6 text-center">
              {rev.username}
            </h2>
            <p className="px-xl-3">
              <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />
              {rev.comment}
            </p>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              {[1, 2, 3, 4, 5].map((index) => (
                <li key={index}>
                  {index <= rev.rating ? (
                    <FontAwesomeIcon
                      icon={solidStar}
                      className="text-warning"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={regularStar}
                      className="text-warning"
                    />
                  )}
                </li>
              ))}
            </ul>
            <div>
              <button
                className="bg-[#007423] hover:bg-[#0dcc46] text-white px-4 py-3 rounded-lg transition"
                onClick={() => {
                  const updatedComment = prompt("Enter the updated comment:");
                  if (updatedComment !== null) {
                    updateComment(rev.id, updatedComment);
                  }
                }}
              >
                Update Comment
              </button>
              <button
                className="bg-[#007423] hover:bg-[#0dcc46] text-white px-4 py-3 rounded-lg transition ml-2"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this comment?"
                    )
                  ) {
                    deleteComment(rev.id);
                  }
                }}
              >
                Delete Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Review;
