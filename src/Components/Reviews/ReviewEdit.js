import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function ReviewEdit( { hideEditModal, isOpen, review, handleEdit } ) {

    const [theReview, setTheReview] = useState({
        title: "",
        reviewer: "",
        content: ""
    })

    const { id } = useParams();

    useEffect(() => {
        setTheReview(review)
    }, [review])
  
    const handleTextChange = (event) => {
        setTheReview({...theReview, [event.target.id]: event.target.value })
    }

  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleEdit(theReview, id)
      hideEditModal();
    };
  

    return (
        <div>
        <Modal show={isOpen} onHide={hideEditModal}>
        <Modal.Header closeButton>
        <Modal.Title>Edit Review Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              id="title"
              type="text"
              className="form-control"
              value={theReview.title}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label>Reviewer:</label>
            <input
              id="reviewer"
              type="text"
              className="form-control"
              value={theReview.reviewer}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              id="content"
              className="form-control"
              value={theReview.content}
              onChange={handleTextChange}
            ></textarea>
          </div>
          <Button variant="secondary" onClick={hideEditModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
        </Modal>
        </div>
    )
}