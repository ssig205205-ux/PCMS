import userIcon from "../userIcon.png";
import {Link} from "react-router-dom"

export default function Header(){
    return(
        <>
        <div className="headerContainer">
            <div className="headerImgAndTitle">
            <div className="headerImg">
                <img className="img" src={userIcon} alt="User Icon" />
            </div>
            <div className="headerTitle">
                <h1>Customers</h1>
                <p>The list of customer</p>
            </div>
            </div>
            <div className="headerButton">
                    <Link style={{ textDecoration: 'none' }} to="/add">
                        <button className="addBt">+ Add Customer</button>
                    </Link>
                    
            </div>
             
        </div>
        
        </>
    )
}