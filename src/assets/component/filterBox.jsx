import {useState} from "react";

export default function FilterBox({setSearchCus,setStatus,setPlan,setDate}) {
    const [searchData,setSearchData] = useState("");
  
    const handleChange = (e)=>{
        e.preventDefault();
        setSearchData(e.target.value);

       
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchCus(searchData);
        setSearchData('');
     
    }
    const handleStatus =(e)=>{
        e.preventDefault();
        setStatus(e.target.value);
        
    }
     const handlePlan =(e)=>{
        e.preventDefault();
        setPlan(e.target.value);
       
    }
     const handleDate =(e)=>{
        e.preventDefault();
        setDate(e.target.value);
       
    }
    return(
        <div className="filter-box">
            <div className="searchBox">
                <input type="text" value={searchData} onChange={handleChange} onKeyDown={(e)=>{
                     if (e.key === "Enter") {
                    handleSearch(e);
    }
                }} placeholder="Search by name,id or phone" className="inputBox" ></input>
                <button className="searchButton" onClick={handleSearch}>Search</button>
            </div>
            <div className="filters">
                <select className="options" onChange={handleStatus}>
                    <option value=''>All status </option>
                    <option>Active </option>
                    <option>Cancel </option>
                    <option> Pending</option>
                </select>
                  <select className="options plans" onChange={handlePlan}>
                    <option value="">All Plans </option>
                    <option>20mbps </option>
                    <option>30mbps </option>
                    <option>40mbps</option>
                    <option>50mbps</option>
                    <option>70mbps</option>
                    <option>100mbps</option>
                    <option>150mbps</option>
                   
                </select>
                <input onChange={handleDate} type="date" className="options"  ></input>
            </div>
        </div>
    )
}