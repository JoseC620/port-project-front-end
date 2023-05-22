import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductEditForm.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Rating } from 'react-simple-star-rating'

const API = process.env.REACT_APP_API_URL;

export default function ProductEditForm() {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    category: "",
    manufacturer: "",
    cost: "",
    rating: "",
    instock: false
  });

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((e) => {
        console.warn("catch", e);
      });
  }, [id]);

  const handleTextChange = (event) => {
    setProduct({ ...product, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setProduct({ ...product, instock: !product.instock });
  };


  const updateProduct = (updatedProduct) => {
    axios
    .put(`${API}/products/${id}`, updatedProduct)
    .then(
        () => {
            navigate(`/products/${id}`);
          },
          (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
}

  const handleCategoryChange = (event) => {
    setProduct({ ...product, category: event.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct(product, id);
  };

  const options = ['Electronics', 'Footwear', 'Home Appliances', 'Books', 'Sports Equipment']

  return (
    <div className="edit-color">
    <div className="edit-container">
    <div className="edit-product-info">
    <h2 className="product-details-name">{product.name}</h2>
    <img src={product.image} alt={product.name} className="edit-image" />
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
      className="edit-rating"
    />
    </div>
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
        <Dropdown 
                className="drop"
                options={options} 
                onChange={handleCategoryChange}
                value={product.category}
                placeholder="Select an option" 
                id='category'
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
      <div>
          <h3 className="preview">Card Preview</h3>
          <br></br>
          <div key={product.id} className="preview-product-card">
          <img src={product.image} alt={product.name} className="product-image"/>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.cost}</p>
          <button className="product-button">Add to Cart</button>
        </div>
        </div>
    </div>
    </div>
  );
}
