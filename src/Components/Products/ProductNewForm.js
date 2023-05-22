import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductEditForm.css";

const API = process.env.REACT_APP_API_URL;

export default function ProductNewForm() {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    category: "",
    manufacturer: "",
    cost: "",
    rating: "",
    instock: false
  });

  const navigate = useNavigate();

  const handleTextChange = (event) => {
    setProduct({ ...product, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setProduct({ ...product, instock: !product.instock });
  };


  const newProduct = (theNewProduct) => {
    axios
    .post(`${API}/products`, theNewProduct)
    .then((response) => {
        navigate(`/products/${response.data.id}`)
    })
    .catch((c) => console.warn("catch", c));
}

const handleSubmit = (event) => {
    event.preventDefault();
    newProduct(product);
  };

  return (
    <div className="edit-container">
      <img src={product.image} alt="Put a url!" className="edit-image" />
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="image" className="edit-label">
          Image:
        </label>
        <input
          id="image"
          type="text"
          value={product.image}
          onChange={handleTextChange}
        />
        <label htmlFor="name" className="edit-label">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={product.name}
          onChange={handleTextChange}
        />

        <label htmlFor="cost" className="edit-label">
          Cost:
        </label>
        <input
          id="cost"
          type="number"
          value={product.cost}
          onChange={handleTextChange}
        />

        <label htmlFor="category" className="edit-label">
          Category:
        </label>
        <input
          id="category"
          type="text"
          value={product.category}
          onChange={handleTextChange}
        />

        <label htmlFor="manufacturer" className="edit-label">
          Manufacturer:
        </label>
        <input
          id="manufacturer"
          type="text"
          value={product.manufacturer}
          onChange={handleTextChange}
        />

        <label htmlFor="rating" className="edit-label">
          Rating:
        </label>
        <input
          id="rating"
          type="number"
          value={product.rating}
          onChange={handleTextChange}
        />
        <label htmlFor="instock">In Stock:</label>
        <input
          id="instock"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={product.instock}
          className="inStock"
        />
        <br></br>
        <button type="submit" className="edit-button">
          Save
        </button>
      </form>
    </div>
  );
}
