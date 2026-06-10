import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const user = localStorage.getItem("id");

  const updateComment = (reviewId, updatedComment) => {
    fetch(`/api/reviews/${reviewId}`, {
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
          setEditingId(null);
          setEditComment("");
        } else {
          console.error("Failed to update comment");
        }
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const deleteComment = (reviewId) => {
    fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          const updatedReviews = reviews.filter((rev) => rev.id !== reviewId);
          setReviews(updatedReviews);
          setDeleteId(null);
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
      fetch(`/api/reviews/${user}`)
        .then((res) => {
          if (res.status === 404) {
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
    <section className="w-full py-4 sm:py-8">
      <h1 className="page-title">My Reviews</h1>
      <p className="page-kicker">
        Edit or remove the reviews you have added to destinations.
      </p>
      {reviews.length === 0 ? (
        <div className="surface-panel mx-auto mt-8 max-w-xl p-6 text-center text-slate-600">
          You have not added any reviews yet.
        </div>
      ) : (
      <div className="card-grid">
        {reviews.map((rev) => (
          <div key={rev.id} className="surface-panel p-5">
            <h2 className="mb-4 text-center text-2xl font-bold text-[#193d11]">
              {rev.username}
            </h2>
            {editingId === rev.id ? (
              <textarea
                className="form-input min-h-[8rem] resize-y"
                value={editComment}
                onChange={(event) => setEditComment(event.target.value)}
              />
            ) : (
              <p className="break-words text-center leading-7 text-slate-700">
                <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />
                {rev.comment}
              </p>
            )}
            <ul className="mb-4 mt-3 flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((index) => (
                <li key={index}>
                  {index <= rev.rating ? (
                    <FontAwesomeIcon
                      icon={solidStar}
                      className="text-amber-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={regularStar}
                      className="text-amber-400"
                    />
                  )}
                </li>
              ))}
            </ul>
            {deleteId === rev.id ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900">
                <p className="mb-3 font-semibold">Delete this review?</p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button className="primary-button bg-red-700 hover:bg-red-800" onClick={() => deleteComment(rev.id)}>
                    Delete
                  </button>
                  <button className="secondary-button" onClick={() => setDeleteId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : editingId === rev.id ? (
              <div className="flex flex-col justify-center gap-2 sm:flex-row">
                <button className="primary-button" onClick={() => updateComment(rev.id, editComment)}>
                  Save
                </button>
                <button
                  className="secondary-button"
                  onClick={() => {
                    setEditingId(null);
                    setEditComment("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-2 sm:flex-row">
                <button
                  className="primary-button"
                  onClick={() => {
                    setEditingId(rev.id);
                    setEditComment(rev.comment);
                  }}
                >
                  Edit
                </button>
                <button className="secondary-button" onClick={() => setDeleteId(rev.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      )}
    </section>
  );


}

export default Review;
