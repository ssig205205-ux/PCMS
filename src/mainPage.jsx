import { useState, useEffect } from "react";
import Header from "./assets/component/header.jsx";
import TotalBoxs from "./assets/component/totalBoxs.jsx";
import FilterSystem from "./assets/component/filterSystem.jsx";
import Navbar from "./assets/component/navbar.jsx";
import "./App.css";
import { useAuth } from "./useAuth.jsx";

export default function MainPage() {
  const {user} = useAuth();
  const userType =  user?.user?.UserType;

  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/user",{
        credentials: "include"
      });
      const data = await response.json();
      console.log("Fetched data:", data);
      setCustomersData(data);
    };
      const fetchData2 = async () => {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/admin/customers",{
        credentials: "include"
      });
      const data = await response.json();
      
      console.log("Fetched data:", data);
      setCustomersData(data);
    };
    if(userType==="admin"){
      fetchData2();
    } else {
      fetchData();
    }

   
  }, []);

  console.log("cdata",customersData)

  return (
    <>
      <Navbar activeStatus={"home"}/>
      <Header />
      <TotalBoxs customersData={customersData} />
      <FilterSystem  customersData={customersData} />
    </>
  );
}
