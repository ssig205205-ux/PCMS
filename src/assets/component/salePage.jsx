import { useState,useEffect } from "react";
import { useScreenSize } from "../context/screenSize";
import { DetailIdContext } from "../context/detail";
import { useNavigate } from "react-router";
import { useContext } from "react";


export default function SalesPage({userId}) {
  const {isMobile} = useScreenSize() // keep your real isMobile logic here later
  const [saleData,setSaleData] = useState([])

 
  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://cms-backend-xyb9.onrender.com/api/admin/cus/${userId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("something is wrong");
        }
        const data = await response.json();
        console.log(data)
        setSaleData(data);
      };
      fetchData();
    }, []);

  const navigate = useNavigate();
  const { setDetailId,setUserIdtD} = useContext(DetailIdContext);
  const handleDetailId = (id,UserID) => {
    setDetailId(id);
    setUserIdtD(UserID);
    navigate("/detail");
  };

  // ✅ Mock data
   let tableData = Array.isArray(saleData) ? [...saleData] : [];

  
  return (
    <div className="tableContainer">
      {!isMobile ? (
        <table className="customTable">
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Name</th>
              <th>NRC Number</th>
              <th>Contact</th>
              <th>Customer ID</th>
              <th>App PW</th>
              <th>Status</th>
              <th>Plans (mbps)</th>
              <th>Ordered Date</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.nrc}</td>
                  <td>
                    {item.phone}, {item.secondPhone}
                  </td>
                  <td>{item.CusId}</td>
                  <td>{item.CusPwd ? item.CusPwd : "_"}</td>
                  <td
                    className={`status ${
                      item.status ? item.status.toLowerCase() : "pending"
                    }`}
                  >
                    {item.status ? item.status.toLowerCase() : "pending"}
                  </td>
                  <td>{item.plan}</td>
                  <td>
                    {new Date(item.OrderDate).toISOString().split("T")[0]}
                  </td>
                  <td>
                    <button
                      className="detailButton"
                      onClick={() =>  handleDetailId(item._id,item.userid)}
                    >
                      =
                    </button>
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
      ) : (
        <table className="customTable">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer ID</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.CusId}</td>
                  <td>{item.phone}</td>
                  <td
                    className={`status ${
                      item.status ? item.status.toLowerCase() : "pending"
                    }`}
                  >
                    {item.status ? item.status.toLowerCase() : "pending"}
                  </td>
                  <td>
                    <button
                      className="detailButton"
                      onClick={() => handleDetailId(item._id,item.userid)}
                    >
                      =
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No User Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}