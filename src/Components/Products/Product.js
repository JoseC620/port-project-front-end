import { Link } from 'react-router-dom';
import '../../App.css'
export default function Product( { product } ) {

  return (
    <div>
        <div key={product.id} className="product-card">
          <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-image"/>
          </Link>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.cost}</p>
          <Link to={`/products/${product.id}`} className="product-button">Purchase!</Link>
        </div>
    </div>
  );
}