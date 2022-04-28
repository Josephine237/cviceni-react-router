import React from 'react';
import { render } from 'react-dom';
import './style.css';


import { About } from "./components/About/index"
import { Contact } from "./components/Contact Us/index"
import { Home } from "./components/Home/index"
import { Products } from "./components/Products/index"
import { NotFound } from './components/NotFound';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <h1>Ciao</h1>

      <nav>
        <Link to ="/about">About</Link>
        |
        <Link to ="/contactus">Contact Us</Link>
        |
        <Link to ="/">Home</Link>
        |
        <Link to ="/products">Products</Link>
        |
       
      </nav>
      <Routes>
        <Route path="/about" element={ <About /> } />
        <Route path="/contactus" element={ <Contact /> } />
        <Route path="/" element={ <Home /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>



    </BrowserRouter>
  )
}

render(<App />, document.querySelector('#app'));
