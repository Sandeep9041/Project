import { useEffect, useState } from "react";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {useParams } from "react-router-dom"
import Header from "../header"

import "./index.css"

const Details =() => {
const [content,setContent] = useState({})
const [img,setImg] = useState("")
const [summary,setSummary] = useState("")
const [name,setName] = useState("")
const [items, setItems] = useState([]);
const [bookingDetails,setBookingDetails] = useState({
    movieName:{name}
    ,name:"",
    time:"2.5 pm"
})


    const {id} = useParams()
    const getData = async() => {
        const url = "https://api.tvmaze.com/search/shows?q=all"
        const response = await fetch(url);
        const data =await response.json();
        const content = data.filter(each=>each.show.id==id)
        setContent(content)
        setImg(content[0].show.image.original)
        setSummary(content[0].show.summary)
        setName(content[0].show.name)
            }
        
useEffect(()=>{
    getData()
    const items = JSON.parse(localStorage.getItem('items'));
console.log(items)
},[])

function autoCorrect(text, correction) {
    const reg = new RegExp(Object.keys(correction).join("|"), "g");
    return text.replace(reg, (matched) => correction[matched]);
  }
  const correction = {
    "<p>": "",
    "</p>": "",
    "</b>": "",
    "<b>": "",
  };
  const correctedText = autoCorrect(summary, correction);

  const handleInputChange=(e)=>{
    const { name, value } = e.target;
    setBookingDetails((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  }

  const submitNow=(e)=>{
    e.preventDefault();
    localStorage.setItem('items', JSON.stringify(bookingDetails));
    // console.log(bookingDetails)
  }

return(
    <>
    <Header />
    <div className="displays">
        <div className="card">
        <img src={img} alt="original" className="original-img" /> 
         <div className="content-detail">
         <h1 className="detail-name">{name}</h1>
         <p className="summary">{correctedText}</p>
         <Popup
     modal
     trigger={
       <button type="button" className="trigger-button">
         Book Now
       </button>
     }
   >
     {close => (
       <>
         <div className="popup" >
            <h2 className="book-heading">Book Tickets</h2>
            <form onSubmit={submitNow}>
                <label forid="name">Movie Name</label>
                <input type="text" id="name" value={name} onChange={handleInputChange}  name="movieName"/><br/>
                <label forid="yourName">Your Name</label>
                <input type="text" id="yourName" value={bookingDetails.name} name="name" onChange={handleInputChange}/><br/>
                <label forid="time">Time</label>
                <select value={bookingDetails.time} name="time" onChange={handleInputChange}>
                    <option value="2.5pm" id="option" >2.5 pm</option>
                    <option value="5 pm">5 pm</option>
                    <option value="11 am">11 am</option>
                    </select>            
                    <button type="submit" className="submit">
                        Book</button></form>
         </div>
         <button
           type="button"
           className="close-btn"
           onClick={() => close()}
         >
           Close
         </button>
       </>
     )}
   </Popup>
         </div>
         </div>
    </div>
    </>
)

}

export default Details;