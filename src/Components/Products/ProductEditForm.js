import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductEditForm.css";

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
            console.log(updatedProduct)
            console.log(product)
            console.log(id)
            navigate(`/products/${id}`);
          },
          (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
}

const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct(product, id);
  };

  return (
    <div className="edit-container">
      <img src={product.image} alt="product" className="edit-image" />
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
