import { useState,useEffect } from "react";
import { CgTrash } from "react-icons/cg";

export default function LeadsTable({userId}) {

  const [leadData,setLeadData] = useState([]);
  const [deleteData,setDelete] = useState(false);


  useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`https://cms-backend-xyb9.onrender.com/api/admin/lead/${userId}`, {
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("something is wrong");
          }
          const data = await response.json();
          console.log(data)
          setLeadData(data)
        };
        fetchData();
      }, [deleteData]);

  // Mock data
  let tableData = Array.isArray(leadData) ? [...leadData] : [];


  const handleSubmitDelete = async (id) => {
    if (window.confirm("are you sure You want to delete this lead?")) {
      try {
        const response = await fetch(`https://cms-backend-xyb9.onrender.com/api/lead/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to delete lead");
        }
        setDelete(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="tableContainer v2">
      <table className="customTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Reason</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tableData.length > 0 ? (
            tableData.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.reason}</td>
                <td className="tdbt">
                  <CgTrash
                    className="trashCan"
                    onClick={() => handleSubmitDelete(lead._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}