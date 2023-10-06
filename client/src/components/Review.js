// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
// import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
// import { useParams } from "react-router-dom";



// function Review() {

//   const { id } = useParams(); // Access 'id' from the route parameters

//   const [reviews, setReviews] = useState([]);
//   const user = localStorage.getItem("id");

  
//   // let id = localStorage.getItem("id")


//   useEffect(() => {
//   if (user) {
//     fetch(`http://127.0.0.1:5555/reviews/${user}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data); // Log the fetched data to the console
//         setReviews(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching reviews:", error);
//       });
//   }
// }, [user]);

//   return (
//     <section>
//       <div className="row d-flex justify-content-center">
//         <div className="col-md-10 col-xl-8 text-center">
//           <h3 className="mb-4">Testimonials</h3>
//           <p className="mb-4 pb-2 mb-md-5 pb-md-0">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet
//             numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum
//             quisquam eum porro a pariatur veniam.
//           </p>
//         </div>
//       </div>
//       <div className="row mt-3">
//         {reviews.map((rev) => (
//           <div key={rev.id} className="col-md-4 mb-5 mb-md-0">
//             <h5 className="mb-3">{rev.username}</h5>
//             <p className="px-xl-3">
//             <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />{rev.comment}
//             </p>
//             <ul className="list-unstyled d-flex justify-content-center mb-0">
//               {[1, 2, 3, 4, 5].map((index) => (
//                 <li key={index}>
//                   {index <= rev.rating ? (
//                     <FontAwesomeIcon icon={solidStar} className="text-warning" />
//                   ) : (
//                     <FontAwesomeIcon icon={regularStar} className="text-warning" />
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Review;


import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

function Review() {
  const { id } = useParams(); // Access 'id' from the route parameters
  const [reviews, setReviews] = useState([]);
  const user = localStorage.getItem("id");

  // Function to update a comment
  const updateComment = (reviewId, updatedComment) => {
    // Make a PATCH request to update the comment
    fetch(`http://127.0.0.1:5555/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: updatedComment }),
    })
      .then((res) => {
        if (res.status === 200) {
          // Update the state to reflect the updated comment
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

  // Function to delete a comment
  const deleteComment = (reviewId) => {
    // Make a DELETE request to delete the comment
    fetch(`http://127.0.0.1:5555/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          // Remove the deleted comment from the state
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
        .then((res) => res.json())
        .then((data) => {
          console.log(data); // Log the fetched data to the console
          setReviews(data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, [user]);

  return (
    <section>
      {/* ... Existing code for displaying reviews */}
      <div className="row mt-3">
        {reviews.map((rev) => (
          <div key={rev.id} className="col-md-4 mb-5 mb-md-0">
            <h5 className="mb-3">{rev.username}</h5>
            <p className="px-xl-3">
              <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />
              {rev.comment}
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
            <div>
              <button
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
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this comment?")) {
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
