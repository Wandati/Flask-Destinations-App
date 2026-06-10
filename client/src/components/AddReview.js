
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddReview() {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const user = localStorage.getItem("id");
  const { id } = useParams();

  const handleClose = () => {
    setShow(false);
    setMessage("");
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    if (!user) {
      setMessage("You must be logged in to add a review.");
      return;
    }

    try {
      const response = await fetch(`/destinationreviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, rating, user_id: user }),
      });

      if (response.status === 201) {
        const newReview = await response.json();
        setMessage(newReview.status || "Review added successfully.");
        setComment("");
        setRating(0);
      } else if (response.status === 401 || response.status === 403) {
        const responseData = await response.json();
        setMessage(responseData.error || "Error adding review.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong while saving the review.");
    }
  };

  return (
    <div>
      <button onClick={handleShow} className="primary-button">
        Add Review
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal-bg absolute inset-0 bg-slate-950/60"></div>
          <div className="modal-content relative mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase text-[#0b6b2b]">Review</p>
                <h2 className="text-2xl font-bold text-slate-900">Add Review</h2>
              </div>
              <button onClick={handleClose} className="secondary-button" type="button">
                Close
              </button>
            </div>
            {message && (
              <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {message}
              </div>
            )}
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="mb-4">
                <label className="mb-2 block font-semibold text-slate-700">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-input min-h-[8rem] resize-y"
                  placeholder="Share what stood out..."
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-semibold text-slate-700">
                  Rating
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="form-input"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="primary-button w-full"
                type="button"
              >
                Save Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
