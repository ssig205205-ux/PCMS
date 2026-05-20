import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {UserIdContext} from "../context/userDetail"

export default function TMLIst() {
  const navigate = useNavigate();
   const { setUserId,setUserName } = useContext(UserIdContext);

  const handleClick = (e,e2) => {
    navigate("/user-sale-detail");
    setUserId(e);
    setUserName(e2);
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/admin", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("something is wrong");
      }
      const data = await response.json();
      console.log(data)
      setUserData(data);
    };
    fetchData();
  }, []);

  let tableData = Array.isArray(userData) ? [...userData] : [];

  return (
    <>
      <div className="tableContainer v2">
        <table className="customTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sales</th>
              <th>Leads</th>
              <th>more</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.totalCustomersSold}</td>
                  <td>{item.totalLeads}</td>
                  <td className="tdbt">
                    <button onClick={()=>{handleClick(item._id,item.name)}}>=</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No User Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
