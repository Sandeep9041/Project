import {useState,useEffect} from "react"
import {AiFillStar} from "react-icons/ai"
import {Link} from "react-router-dom"
import "./index.css"
import Header from "../header"

const Home = () => {

    const [list,setList] = useState([])

    const getData = async() => {
    const url = "https://api.tvmaze.com/search/shows?q=all"
    const response = await fetch(url);
    const data =await response.json();
    setList(data)
    }

    useEffect(()=>{
        getData();
    },[])


    return (
        <>
        <Header />
        <div className="bg">
            <div className="containers">
                <h1 className="main-heading">Shows</h1>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <ul>
                        {list.map(each=>{
                            const {image,name,rating} = each.show
                                return(
                                    <Link to ={`/${each.show.id}`} style={{textDecoration: 'none'}}>
                                        <li key={each.show.id}>
                                        <img src={image.medium} alt={name}/>
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