import Navbar from "./assets/component/navbar";
import LeadPage from "./assets/component/leadPage";
import { useState,useEffect } from "react";

export default function Lead() {
  const [lead,setLead] = useState([]);
  const [Delete,setDelete] = useState(false);

  useEffect(  () =>{
    const leadData = async () => {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/lead",{
        credentials: "include"
      });
      const data = await response.json();
      console.log("Fetched data:", data);
      setLead(data)
    };
    
    leadData();

  },[Delete])


  return (
    <>
      <Navbar activeStatus="lead"></Navbar>
    <LeadPage lead={lead} setLead={setLead} Delete={Delete} setDelete={setDelete}></LeadPage>
    </>
  );
}