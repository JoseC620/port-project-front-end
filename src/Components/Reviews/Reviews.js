import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Review from "./Review";
import ReviewNew from "./ReviewNew";
const API = process.env.REACT_APP_API_URL;


export default function Reviews() {

    const [reviews, setReviews] = useState([])
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
  
    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
    };

    useEffect(() => {
        axios
        .get(`${API}/products/${id}/reviews`)
        .then((response) => {
            setReviews(response.data)
        })
        .catch((error) => {
            console.warn(error)
        })
    }, [id])

    const deleteReview = (reviewID) => {
        axios
          .delete(`${API}/products/${id}/reviews/${reviewID}`)
          .then(() => {
            const copyReviewArray = [...reviews];
            const indexDeletedReview = copyReviewArray.findIndex((review) => {
              return review.id === reviewID;
            });
            copyReviewArray.splice(indexDeletedReview, 1);
            setReviews(copyReviewArray);
          })
          .catch((error) => {
            console.warn('Error deleting review:', error);
          });
      };

      const updateReview = (updatedReview) => {
        axios
        .put(`${API}/products/${id}/reviews/${updatedReview.id}`, updatedReview)
        .then((response) => {
            const copyReviewArray = [...reviews];
            const indexUpdatedReview = copyReviewArray.findIndex((review) => {
              return review.id === updatedReview.id;
            });
            copyReviewArray[indexUpdatedReview] = response.data;
            setReviews(copyReviewArray);
          })
        .catch((c) => console.warn("catch", c));
    }

    const addReview = (newReview) => {
      axios
        .post(`${API}/products/${id}/reviews`, newReview)
        .then(
          (response) => {
            setReviews([response.data, ...reviews]);
          },
          (error) => console.error(error)
        )
        .catch((e) => console.warn("catch", e));
    };


      return (
        <Container>
          { reviews && Object.keys(reviews).length > 0 ? (
            <div>
            <button className="newReview" onClick={showModal}>Add a Review</button>
            <ReviewNew
              hideModal={hideModal}
              isOpen={isOpen}
              handleAdd={addReview}
            />
            </div>
          ) : (
            <div></div>
          )}
          { reviews && Object.keys(reviews).length > 0 ? (
          <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <Review review={review} handleDelete={() => deleteReview(review.id)} handleEdit ={updateReview} />
            </div>
          ))}
          </div>
          ) : (
            <div className="no-reviews">
            <h2>No reviews available.</h2>
            <span>Add one!</span>
            <br></br>
            <button onClick={showModal}>Add a Review</button>
            <ReviewNew
              hideModal={hideModal}
              isOpen={isOpen}
              handleAdd={addReview}
            />
            </div>
          )
      }
        </Container>
      );
    }      