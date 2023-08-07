import {Link} from "react-router-dom"

const Header = () => (
    <Link to="/" style={{textDecoration:"none"}}>
        <div className="header">
            <h2 className="header-heading">Movies</h2>
        </div>
    </Link>    
)

export default Header 