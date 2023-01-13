import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate} from 'react-router-dom';
import CreateAnimal from './pages/CreateAnimal';
import CreateProduct from './pages/CreateProduct';
import ViewAnimals from './pages/ViewAnimals';
import ViewProducts from './pages/ViewProducts';

function App() {
  const navigate = useNavigate();

  function navCreateAnimal(){
    navigate("/createAnimal")
  }
  return (
    <div className="App">
          <div className='flex flex-row gap-8 justify-center py-4 bg-slate-300 mb-8'>
            <h5 onClick={navCreateAnimal}>Register animal</h5>
            <h5 onClick={()=>navigate("/createProduct")}>Register product</h5>
            <h5 onClick={()=>navigate("/viewAnimal")}>View animals</h5>
            <h5 onClick={()=>navigate("/viewProducts")}>View products</h5>
          </div>
            <Routes>
              <Route element={<CreateAnimal/>} path="/createAnimal" ></Route>
              <Route element={<CreateProduct/>} path="/createProduct" ></Route>
              <Route element={<ViewAnimals/>} path="/viewAnimal" ></Route>
              <Route element={<ViewProducts/>} path="/viewProducts" ></Route>
            </Routes>
    </div>
  );
}

export default App;
