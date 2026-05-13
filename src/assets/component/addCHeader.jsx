import AddCus from "../AddCus.png"
import { Link } from "react-router"

export default function AddHeader(){
    return(
          <div className="headerContainer2">
            <div className="headerImgAndTitle">
            <div className="headerImg2 ">
                <img className="img" src={AddCus} alt="User Icon" />
            </div>
            <div className="headerTitle">
                <h1>Add Customers</h1>
                <p>Fill in the details to add a new customer</p>
            </div>
            </div>
            <div className="headerButton2">
             <Link style={{textDecoration :'none'}} to="/">  <button className="backBt">Back</button></Link>
          
            </div>
        </div>
        
    )
}