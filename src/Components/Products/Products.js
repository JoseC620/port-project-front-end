import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Product from "./Product";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const API = process.env.REACT_APP_API_URL;


export default function Products() {

    const [products, setProducts] = useState([])
    const [sorted, setSorted] = useState([])

    useEffect(() => {
        axios
        .get(`${API}/products`)
        .then((response) =>{
            setProducts(response.data)
            setSorted(response.data)
        })
        .catch((error) => {
            console.warn(error)
        })
    }, [])

    const sortBycostAscending = () => {
        const sortedProducts = [...products].sort((a, b) => a.cost - b.cost);
        setSorted(sortedProducts);
      };
    
      const sortBycostDescending = () => {
        const sortedProducts = [...products].sort((a, b) => b.cost - a.cost);
        setSorted(sortedProducts);
      };

      const sortByCategory = (event) => {
        if(event.value === "All"){
        setSorted(products)
        }
        else if(sorted){
        const sortedProducts = products.filter((product) => product.category === event.value)
        setSorted(sortedProducts);
        } else {
        setSorted(products)
        }
      };

      const options = ['All', 'Electronics', 'Footwear', 'Home Appliances', 'Books', 'Sports Equipment']

    return(
        
        <Container className="product-showcase">
        <div className="navigation">
        <button onClick={sortBycostAscending}>Sort by cost (Low to High)</button>
        <button onClick={sortBycostDescending}>Sort by cost (High to Low)</button>
        <label>Sort by Category:</label>
        <Dropdown 
                className="drop"
                onChange={sortByCategory}
                options={options} 
                placeholder="Select an option" 
                id='category'
                />
      </div>
            {sorted.map((product) => {
              return ( 
                <div key={product.id}>
                <Product key={product.id} product={product} />
                </div>
              )
            })}
        </Container>
    )
}