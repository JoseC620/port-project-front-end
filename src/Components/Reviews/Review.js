import './Review.css'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReviewEdit from './ReviewEdit';



export default function Review({ review, handleDelete, handleEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showEditModal = () => {
    setIsEditOpen(true);
  };

  const hideEditModal = () => {
    setIsEditOpen(false);
  };


  return (
    <div className="reviews">
      <h3>Review</h3>
        <ul>
          <li key={review.id}>
            <h4>{review.title}</h4>
            <p>Reviewer: {review.reviewer}</p>
            <span><b>Description:</b></span>
            <br></br>
            <p>{review.content}</p>
            <button onClick={showEditModal}>Edit</button>
            <ReviewEdit
              hideEditModal={hideEditModal}
              isOpen={isEditOpen}
              review={review}
              handleEdit={handleEdit}
            />
            <button onClick={showModal}>Delete</button>
            <Modal show={isOpen} onHide={hideModal}>
              <Modal.Header>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this Review?</Modal.Body>
              <Modal.Footer>
                <button onClick={hideModal}>CANCEL</button>
                <button onClick={handleDelete}>DELETE</button>
              </Modal.Footer>
            </Modal>
          </li>
        </ul>
    </div>
  );
}
