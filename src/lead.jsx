import Navbar from "./assets/component/navbar";
import LeadPage from "./assets/component/leadPage";
import { useState,useEffect } from "react";
import { useAuth } from "./useAuth";

export default function Lead() {
  const [lead,setLead] = useState([]);
  const [Delete,setDelete] = useState(false);

  const {user} = useAuth();
    const userType =  user?.user?.UserType;

  useEffect(  () =>{
    const leadData = async () => {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/lead",{
        credentials: "include"
      });
      const data = await response.json();
      console.log("Fetched data:", data);
      setLead(data)
    };
    const leadData2 = async () => {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/admin/leads",{
        credentials: "include"
      });
      const data = await response.json();
      console.log("Fetched data:", data);
      setLead(data)
    };
    
  if(userType==="admin"){
      leadData2();
    } else {
      leadData();
    }
  },[Delete])


  return (
    <>
      <Navbar activeStatus="lead"></Navbar>
    <LeadPage lead={lead} setLead={setLead} Delete={Delete} setDelete={setDelete}></LeadPage>
    </>
  );
}