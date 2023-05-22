import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";


export default function ReviewNew( { hideModal, isOpen, handleAdd } ) {

    const { id } = useParams();
    const [theReview, setTheReview] = useState({
        title: "",
        reviewer: "",
        content: "",
        products_id: id
    })

    const handleTextChange = (event) => {
        setTheReview({...theReview, [event.target.id]: event.target.value })
    }

  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleAdd(theReview)
      hideModal();
    };
  

    return (
        <div>
        <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header closeButton>
        <Modal.Title>New Review Form</Modal.Title>
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
          <br></br>
          <Button variant="secondary" onClick={hideModal}>
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