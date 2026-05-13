import { CgTrash } from "react-icons/cg";
import {  useState } from "react";

export default function LeadPage({ lead, setLead, setDelete }) {
  // State to manage the search input and filtered leads
  const [filterWord, setFilterWord] = useState("");
  const [filter, setFilter] = useState("");
  const [leadAdder, setLeadAdder] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  const leadReverse = Array.isArray(lead) ? [...lead].reverse() : [];
  let leadTableData = leadReverse;

  if (filterWord) {
    leadTableData = leadReverse.filter((item) => {
      const searchTerm = filterWord.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.phone.toString().includes(searchTerm)
      );
    });
  }

  const handleChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleClick = () => {
    setFilterWord(filter);
    console.log(filterWord);
    setFilter("");
  };

  const handleAddLead = () => {
    // Logic to add a new lead
    if (leadAdder === false) {
      setLeadAdder(true);
    } else if (leadAdder === true) {
      setLeadAdder(false);
    }
  };

  const handleName = (e) => {
    e.preventDefault();
    const name = e.target.value;
    setName(name);
  };

  const handlePhone = (e) => {
    e.preventDefault();
    const phone = e.target.value;
    setPhone(phone);
  };

  const handleReason = (e) => {
    e.preventDefault();
    const reason = e.target.value;
    setReason(reason);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // move this to top

    if (!name || !phone || !reason) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, reason }), // fix here
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json(); // add await

      setLead((prev) => [...prev, data]);
      setName("");
      setPhone("");
      setReason("");
      setLeadAdder(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitDelete = async (id) => {
    if (window.confirm("are you sure You want to delete this lead?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/lead/${id}`, {
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
    <div className="leadPageContainer">
      <div className="LeadPageTitle">
        <h1>Leads</h1>
        <p>Manage Your Leads lists</p>
      </div>
      <div className="leadPageFilter">
        <div className="leadPageFilterLeft">
          <input
            type="text"
            className="Lead-input"
            value={filter}
            onChange={handleChange}
            placeholder="Search by name or phone number"
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
          />
          <button
            className="searchBt"
            onClick={handleClick}
          
          >
            Search
          </button>
        </div>
        <div className="leadPageFilterRight">
          <button className="addLeadBt" onClick={handleAddLead}>
            {leadAdder ? "Cancel" : "Add Lead"}
          </button>
        </div>
      </div>

      {leadAdder && (
        <form className="leadAdder" onSubmit={handleSubmit}>
          <div className="leadAdderInput">
            <label>
              name:
              <input placeholder="Enter Name" onChange={handleName}></input>
            </label>
            <label>
              Phone:
              <input placeholder="Enter phone" onChange={handlePhone}></input>
            </label>
            <label>
              reason:
              <input placeholder="Enter Reason" onChange={handleReason}></input>
            </label>
          </div>
          <button type="submit">Add</button>
        </form>
      )}

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
            {leadTableData && leadTableData.length > 0 ? (
              leadTableData.map((lead) => (
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
                <td colSpan="4">No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
