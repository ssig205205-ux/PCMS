import CusTotal from "../CusTotal.png";
import CusActive from "../CusActive.png";
import CusCancel from "../CusCancel.png";
import Lead from "../Lead.png";

import { useState, useEffect } from "react";

export default function TotalBoxs({customersData}) {
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);
  const [cancel, setCancel] = useState(0);
  const [lead, setLead] = useState(0);

  useEffect(() => {
    setTotal(customersData.length);
    let activeCount = 0;
    let cancelCount = 0;
    let leadCount = 0;

    customersData.forEach((item) => {
      if (item.status === "Active") {
        activeCount++;
      }
      if (item.status === "Cancel") {
        cancelCount++;
      }
      if (item.status === "Pending") {
        leadCount++;
      }
    });
    setActive(activeCount);
    setCancel(cancelCount);
    setLead(leadCount);
  }, [customersData]);

  return (
    <div className="totalBoxs">
      <div className="Boxs totalCustomer">
        <img className="totalCusImg" src={CusTotal} alt="Customer Total Icon" />
        <div className="totalCusText">
          <h2>Total Customers</h2>
          <p>{total}</p>
        </div>
      </div>

      <div className="Boxs totalActive">
        <img
          className="totalActiveImg"
          src={CusActive}
          alt="Customer Active Icon"
        />
        <div className="totalCusText">
          <h2>Active Customers</h2>
          <p>{active}</p>
        </div>
      </div>

      <div className="Boxs totalCancel">
        <img
          className="totalActiveImg cancelImg"
          src={CusCancel}
          alt="Customer Cancel Icon"
        />
        <div className="totalCusText CancelText">
          <h2>Cancels</h2>
          <p>{cancel}</p>
        </div>
      </div>

      <div className="Boxs totalLead">
        <img
          className="totalActiveImg LeadImg"
          src={Lead}
          alt="Customer Lead Icon"
        />
        <div className="totalCusText LeadText">
          <h2>Pending</h2>
          <p>{lead}</p>
        </div>
      </div>
    </div>
  );
}
