import {useState,useEffect} from "react"
import {AiFillStar} from "react-icons/ai"
import {Link} from "react-router-dom"
import "./index.css"
import Header from "../header"

const Home = () => {

    const [data, setData] = useState([]);
  const [error, setError] = useState(null);

const getData = async() => {
    try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const json = await response.json();
        const updateData = json.filter(each => each.show.id!==65759)
        // console.log(updateData.length)
        setData(updateData);
      } catch (error) {
        setError(error);
      }
} 

useEffect(() => {
    getData();
}, [] );
      return (
        <>
        <Header />
        <div className="bg">
            <div className="containers">
                <h1 className="main-heading">Top Movies</h1>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <ul>
                        {data.map(each=>{
                            const {image,name,rating} = each.show;
                            //  console.log(typeof each.show.id)
                                return(
                                    <Link key={each.show.id} to ={`/${each.show.id}`} style={{textDecoration: 'none'}}>
                                        <li >
                                        <img src={image.medium} alt={name} className="img"/>
                                        <div className="content">
                                        <h3 className="name">{name}</h3>
                                        <div className="star-containers">
                                        {rating.average===null ? "" : <AiFillStar />}
                                        <p className="rating">{rating.average}</p>
                                        </div>
                                        </div>
                                        </li>
                                    </Link>
                                    )
                                }       
                            )}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home