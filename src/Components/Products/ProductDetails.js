import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import './ProductDetails.css'
import Reviews from "../Reviews/Reviews";
import { Rating } from 'react-simple-star-rating'
const API = process.env.REACT_APP_API_URL;

export default function ProductDetails() {
    const [product, setProduct] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
    };

    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios
        .get(`${API}/products/${id}`)
        .then((response) => {
            setProduct(response.data);
          }).catch((e) => {
            console.warn('catch', e)
          })
        }, [id]);



    const deleteProduct = () => {
        axios.delete(`${API}/products/${id}`)
        .then(() => {
            navigate(`/products`);
        },
        (error) => console.error(error)
        )
        .catch((c) => console.warn('catch', c));
    };

    const handleDelete = () => {
        deleteProduct();
    }

  return (
<div className="product-details">
  <div className="product-details-container">
    <h2 className="product-details-name">{product.name}</h2>
    <img src={product.image} alt={product.name} className="product-details-image" />
    <Container className="product-info">
    <br></br>
    <p>Price: ${product.cost}</p>
    <p>Category: {product.category}</p>
    <p>Manufacturer: {product.manufacturer}</p>
    <p>
      {product.instock ? 'In Stock' : 'Out of Stock'}
    </p>
    <p>Rating: {product.rating}</p>
    <Rating 
      initialValue={product.rating}
      allowFraction={true}
      allowHover={false}
      className="rating"
    />
    </Container>
    <div className="buttons">
    <button>Purchase!</button>
    <Link to={'/products'}>
      <button>Go Back</button>
      </Link>
      <Link to={`/products/${id}/edit`}>
        <button>Edit</button>
      </Link>
    <button onClick={showModal}>Delete</button>
        <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>CANCEL</button>
          <button onClick={handleDelete}>DELETE</button>
        </Modal.Footer>
      </Modal>
      </div>
  </div>
  <Reviews />
</div>
  );
};

