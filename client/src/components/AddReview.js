import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function AddReview() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const user = localStorage.getItem("id");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/destinationreviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, rating, user_id: user }),
      });

      if (response.status === 201) {
        const newReview = await response.json();
        setComment("");
        setRating(0);
        handleClose();
      } else {
        handleClose();
        alert("Must sign in to add a review");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-3" // Add Bootstrap class for margin
              />
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your rating (1-5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mb-3" // Add Bootstrap class for margin
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



