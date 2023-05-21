import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Nav() {

  return (
    <Navbar bg='secondary' expand='lg' style={{height: '75px'}}>
        <Container>
          <Link to={'/'} style={{color: "Black"}}>Home</Link>
            <Link to={'/products'} style={{color: "Black"}}>All Products </Link>
                <Link to={'/products/new'} style={{color: "Black"}}>Make A New Product!</Link>
        </Container>
    </Navbar>
  );
}