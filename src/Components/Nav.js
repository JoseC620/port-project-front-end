import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Nav( { product } ) {

    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
  
    const toggleCart = () => {
      setIsCartOpen(!isCartOpen);
      console.log(product)
    };
  

  return (
    <Navbar bg='secondary' expand='lg' style={{height: '75px'}}>
        <Container>
          <Link to={'/'} style={{color: "Black"}}>Home</Link>
          <Link to={'/products'} style={{color: "Black"}}>All Products </Link>
          <Link to={'/products/new'} style={{color: "Black"}}>Make A New Product!</Link>
        <button onClick={toggleCart}><img src='https://www.iconpacks.net/icons/2/free-shopping-cart-icon-3041.png' height='30px'/></button>
        <div>
        {isCartOpen && (
          <div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        )}
        </div>

        </Container>
    </Navbar>
  );
}