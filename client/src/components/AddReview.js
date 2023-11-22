// import React, { useState } from "react";
// import { Button, Modal, Form } from "react-bootstrap";
// import { useParams } from "react-router-dom";

// export default function AddReview() {
//   const { id } = useParams();

//   const [show, setShow] = useState(false);
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(0);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const user = localStorage.getItem("id");

//   const handleSubmit = async () => {
//     try {
//       // Perform your API call to add a review here
//       const response = await fetch(`https://destinations-server-app.onrender.com/destinationreviews/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ comment, rating, user_id: user }),
//       });

//       if (response.status === 201) {
//         const newReview = await response.json();

//         setComment("");
//         setRating(0);
//         handleClose();
//       } else {

//         handleClose();
//         alert("Must sign in to add a review");

//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Add Review
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Review</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="comment">
//               <Form.Label>Comment</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your review"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="rating">
//               <Form.Label>Rating</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter your rating (1-5)"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSubmit} >
//             Save Review
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

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
    try {
      const response = await fetch(
        `https://destinations-server-app.onrender.com/destinationreviews/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment, rating, user_id: user }),
        }
      );

      if (response.status === 201) {
        const newReview = await response.json();
        console.log(newReview);

        setComment("");
        setRating(0);
        handleClose();
      } else if (response.status === 403) {
        handleClose();
        alert("Review must be between 1-10");
      } else {
        handleClose();
        alert("Must sign in to add a review");
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
          <div className="modal-content bg-white w-1/2 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Review</h2>
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
