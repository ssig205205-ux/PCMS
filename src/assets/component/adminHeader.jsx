
import { Link } from "react-router"
import AdminLogo from "../AdminLogo.png"


export default function AdminHeader(){

   

    
    return(
          <div className="headerContainer2 adminheader" >
            <div className="headerImgAndTitle">
            <div className="headerImg2 ">
                <img className="img" src={AdminLogo} alt="User Icon" />
            </div>
            <div className="headerTitle">
                <h1>Admin</h1>
                <p>Manage your Team sales</p>
            </div>
            </div>
           
        </div>
        
    )
}