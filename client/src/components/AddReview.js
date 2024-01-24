
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddReview() {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const user = localStorage.getItem("id");
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to add a review");
      return;
    }

    try {
      const response = await fetch(`https://destinations-server-app.onrender.com/destinationreviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, rating, user_id: user }),
      });

      if (response.status === 201) {
        const newReview = await response.json();
        alert(newReview.status || "Review added successfully!!!");
        setComment("");
        setRating(0);
        handleClose();
      } else if (response.status === 401 || response.status === 403) {
        const responseData = await response.json();
        handleClose();
        alert(responseData.error || "Error adding review");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleShow}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Review
      </button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-bg inset-0 bg-black opacity-50"></div>
          <div className="modal-content bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Add Review</h2>
              <button onClick={handleClose} className="text-gray-700">
                Close
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold">
                  Comment
                </label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold">
                  Rating
                </label>
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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
