import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DetailIdContext } from "../context/detail";
import { useScreenSize } from "../context/screenSize";
export default function Tabel({
  searchCus,
  status,
  plan,
  date,
  customersData,
}) {
  let tableData = [...customersData];

  if (searchCus) {
    tableData = tableData.filter((item) => {
      const searchTerm = searchCus.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        // item.id.toString().includes(searchTerm) ||
        item.phone.toString().includes(searchTerm) ||
        item.CusId.toString().includes(searchTerm)
      );
    });
  }

  if (status) {
    tableData = tableData.filter((item) => item.status === status);
  }

  if (plan) {
    tableData = tableData.filter((item) => item.plan === plan);
  }

  if (date) {
    tableData = tableData.filter((item) => item.orderDateFormatted === date);
  }

  const navigate = useNavigate();
  const { setDetailId } = useContext(DetailIdContext);
  const handleDetailId = (id) => {
    setDetailId(id);
    navigate("/detail");
  };

  //eslint-disable-next-line
  const { isMobile, isTablet, isDesktop } = useScreenSize();

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
              tableData.map((item) => (
                <tr key={item._id}>
                  <td>{tableData.indexOf(item) + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.nrc}</td>
                  <td>{item.phone},{item. secondPhone}</td>
                  <td>{item.CusId}</td>
                  <td>
                    {item.CusPwd ? item.CusPwd : "_"}
                  </td>
                  <td
                    className={`status ${item.status ? item.status.toLowerCase() : "pending"}`}
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
                      onClick={() => handleDetailId(item._id)}
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
                  {/* <td>{tableData.indexOf(item) + 1}</td> */}
                  <td>{item.name}</td>
                  <td>{item.CusId}</td>
                  <td>{item.phone}</td>
                  <td
                    className={`status ${item.status ? item.status.toLowerCase() : "pending"}`}
                  >
                    {item.status ? item.status.toLowerCase() : "pending"}
                  </td>
                  <td>
                    <button
                      className="detailButton"
                      onClick={() => handleDetailId(item._id)}
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
      )}
    </div>
  );
}
