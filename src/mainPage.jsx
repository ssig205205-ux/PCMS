import { useState, useEffect } from "react";
import Header from "./assets/component/header.jsx";
import TotalBoxs from "./assets/component/totalBoxs.jsx";
import FilterSystem from "./assets/component/filterSystem.jsx";
import Navbar from "./assets/component/navbar.jsx";
import "./App.css";

export default function MainPage() {

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

    fetchData();
  }, []);

  return (
    <>
      <Navbar activeStatus={"home"}/>
      <Header />
      <TotalBoxs customersData={customersData} />
      <FilterSystem  customersData={customersData} />
    </>
  );
}
