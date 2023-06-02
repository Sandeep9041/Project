import {Routes,Route,BrowserRouter } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Home from "./Components/Home"
import Details from "./Components/Details"

function App() {
  return (
    <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/:id" element={<Details/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
