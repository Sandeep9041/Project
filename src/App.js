import {Routes,Route,BrowserRouter } from "react-router-dom"
import './App.css';
import Home from "./Components/Home/index"
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
