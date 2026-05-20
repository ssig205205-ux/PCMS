import userIcon from "../userIcon.png";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";


export default function SalesDetailsH({activePage,setActivePage,userName}) {
    const navigate = useNavigate();

    const handleBack = ()=>{
        navigate(-1);
    }

    
  
  return (
    <div className="saleHeader">
      
      <div className="detailH">
         <GoArrowLeft className="Arrow adminA" onClick={handleBack} />
        <img className="img" src={userIcon} alt="User Icon" />
        <h1>{userName}'s {activePage}</h1>
      </div>

      <div className="saleList">
        <ul className="detaillist">
          <li
            onClick={() => setActivePage("sales")}
            className={activePage === "sales" ? "saleActive" : ""}
          >
            Sales
          </li>

          <li
            onClick={() => setActivePage("leads")}
            className={activePage === "leads" ? "saleActive" : ""}
          >
            Leads
          </li>
        </ul>
      </div>
    </div>
  );
}