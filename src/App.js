import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Nav';
import Edit from './Pages/Edit';
import Home from './Pages/Home';
import Index from './Pages/Index';
import New from './Pages/New';
import Show from './Pages/Show';



function App() {

  return (
    <div className='App'>
      <Router>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Index />} />
            <Route path="/products/:id" element={<Show />} />
            <Route path="/products/new" element={<New />} />
            <Route path="/products/:id/edit" element={<Edit />} />
          </Routes>
        </main>
      </Router>
      
    </div>
  )
}

export default App;
