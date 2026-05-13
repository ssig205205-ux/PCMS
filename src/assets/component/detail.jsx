import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DetailIdContext } from "../context/detail";

export default function Detail() {
  const navigate = useNavigate();
  const { detailId } = useContext(DetailIdContext);

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});

  // ✅ edit states
  const [updateName, setName] = useState("");
  const [updateNrc, setNrc] = useState("");
  const [updateID, setID] = useState("");
  const [updateCusPwd, setCusPwd] = useState("");
  const [updatePhone, setPhone] = useState("");
  const [updateAddress, setAddress] = useState("");
  const [updateLocation, setLocation] = useState("");
  const [updatePlan, setPlan] = useState("");
  const [updateRequestDate, setRequestedDate] = useState("");
  const [updateAdvanceMonth, setAdvanceMonth] = useState("");
  const [updateActiveDate, setActiveDate] = useState("");
  const [updateOrderDate, setOrderDate] = useState("");
  const [updatePromotion, setPromotion] = useState("");
  const [updateStatus, setStatus] = useState("");

  // ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  // fetch
  useEffect(() => {
    const fetchData = async () => {
      if (!detailId) return;

      const res = await fetch(`https://cms-backend-xyb9.onrender.com/api/user/${detailId}`, {
        credentials: "include",
      });

      const result = await res.json();
      console.log(result);
      setData(result);
    };

    fetchData();
  }, [detailId]);

  const {
    name,
    nrc,
    CusId,
    CusPwd,
    phone,
    secondPhone,
    address,
    location,
    plan,
    orderDate,
    activeDate,
    requestDate,
    orderDateFormatted,
    activeDateFormatted,
    requestDateFormatted,
    advanceMonth,
    promotion,
    status,
  } = data;

  // ✅ EDIT BUTTON (fixed logic)
  const handleEditClick = () => {
    if (!edit) {
      // preload
      setName(name || "");
      setNrc(nrc || "");
      setID(CusId || "");
      setCusPwd(CusPwd || "");
      setPhone(`${phone || ""},${secondPhone || ""}`);
      setAddress(address || "");
      setLocation(location ? `${location.lat},${location.lng}` : "");
      setPlan(plan || "");
      setRequestedDate(requestDateFormatted || "");
      setAdvanceMonth(advanceMonth || "");
      setActiveDate(activeDateFormatted || "");
      setOrderDate(orderDateFormatted || "");
      setPromotion(promotion || "");
      setStatus(status || "");
    } else {
      if (window.confirm("Save changes?")) {
        updateData();
      }
    }

    setEdit(!edit);
  };

  // ✅ SAVE
  const updateData = async () => {
    const [p1, p2] = (updatePhone || "").split(",");

    const [lat, lng] = (updateLocation || "")
      .split(",")
      .map((v) => parseFloat(v.trim()));

    const updatedData = {
      name: updateName || name,
      nrc: updateNrc || nrc,
      CusId: updateID || CusId,
      CusPwd: updateCusPwd || CusPwd,
      phone: p1?.trim() || phone,
      secondPhone: p2?.trim() || secondPhone,
      address: updateAddress || address,
      location: !isNaN(lat) && !isNaN(lng) ? { lat, lng } : location,
      plan: updatePlan || plan,
      requestDate: updateRequestDate || requestDateFormatted || requestDate,
      advanceMonth: updateAdvanceMonth || advanceMonth,
      activeDate: updateActiveDate || activeDateFormatted || activeDate,
      orderDate: updateOrderDate || orderDateFormatted || orderDate,
      promotion: updatePromotion || promotion,
      status: updateStatus || status,
    };

    const res = await fetch(`https://cms-backend-xyb9.onrender.com/api/user/${detailId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });

    const updated = await res.json();
    console.log(updated);
    setData(updated);
  };

  return (
    <div>
      <div className="detailTitle">
        <div className="detailTitle2">
          <Link to="/">
            <GoArrowLeft className="Arrow" />
          </Link>
          <h1>Customer Details</h1>
        </div>

        <button className="editBt" onClick={handleEditClick}>
          {edit ? "Save" : "Edit"}
        </button>
      </div>

      <div className="detailContainer">
        {/* NAME */}
        <div className="card">
          {!edit ? (
            <div className="name">{name}</div>
          ) : (
            <input
              value={updateName}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <span className="badge">{status}</span>
        </div>

        {/* PERSONAL */}
        <div className="card">
          <div className="section-title">👤 Personal Information</div>

          <div className="row">
            <span>NRC</span>
            {!edit ? (
              <span>{nrc}</span>
            ) : (
              <input
                value={updateNrc}
                onChange={(e) => setNrc(e.target.value)}
              />
            )}
          </div>
            <div className="row">
            <span>Customer Id</span>
            {!edit ? (
              <span>{CusId}</span>
            ) : (
              <input
                value={updateID}
                onChange={(e) => setID(e.target.value)}
              />
            )}
          </div>
            <div className="row">
            <span>App password</span>
            {!edit ? (
              <span>{CusPwd}</span>
            ) : (
              <input
                value={updateCusPwd}
                onChange={(e) => setCusPwd(e.target.value)}
              />
              
            )}
          </div>
          
        </div>

        {/* CONTACT */}
        <div className="card">
          <div className="section-title">📞 Contact</div>

          <div className="row">
            <span>Phones</span>
            {!edit ? (
              <span>
                {phone}, {secondPhone}
              </span>
            ) : (
              <input
                value={updatePhone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
          </div>

          <div className="row">
            <span>Address</span>
            {!edit ? (
              <span>{address}</span>
            ) : (
              <input
                value={updateAddress}
                onChange={(e) => setAddress(e.target.value)}
              />
            )}
          </div>

          <div className="row">
            <span>Location</span>
            {!edit ? (
              <span>{location ? `${location.lat}, ${location.lng}` : ""}</span>
            ) : (
              <input
                value={updateLocation}
                onChange={(e) => setLocation(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* SERVICE */}
        <div className="card">
          <div className="section-title">📦 Service</div>

          <div className="row">
            <span>Plan</span>
            {!edit ? (
              <span>{plan}</span>
            ) : (
              <select
                value={updatePlan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="20mbps">20mbps</option>
                <option value="30mbps">30mbps</option>
                <option value="40mbps">40mbps</option>
                <option value="50mbps">50mbps</option>
                <option value="70mbps">70mbps</option>
                <option value="100mbps">100mbps</option>
                <option value="150mbps">150mbps</option>
              </select>
            )}
          </div>

          <div className="row">
            <span>Status</span>
            {!edit ? (
              <span>{status}</span>
            ) : (
              <select
                value={updateStatus}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Active</option>
                <option>Cancel</option>
                <option>Pending</option>
              </select>
            )}
          </div>

          <div className="row">
            <span>Advance Month</span>
            {!edit ? (
              <span>{advanceMonth}</span>
            ) : (
              <input
                value={updateAdvanceMonth}
                onChange={(e) => setAdvanceMonth(e.target.value)}
              />
            )}
          </div>

          <div className="row">
            <span>Promotion</span>
            {!edit ? (
              <span>{promotion}</span>
            ) : (
              <select
                value={updatePromotion}
                onChange={(e) => setPromotion(e.target.value)}
              >
                <option value="">Select</option>
                <option value="300 meter coverage">300 meter coverage</option>
                <option value="+1 month">+1 month</option>
                <option value="+2 months">+2 months</option>
              </select>
            )}
          </div>
        </div>

        {/* DATES */}
        <div className="card">
          <div className="section-title">📅 Timeline</div>

          <div className="row">
            <span>Order</span>
            {!edit ? (
              <span>{orderDateFormatted ? orderDateFormatted : orderDate}</span>
            ) : (
              <input
                type="date"
                value={
                  updateOrderDate
                    ? updateOrderDate
                    : orderDateFormatted
                      ? orderDateFormatted
                      : orderDate
                }
                onChange={(e) => setOrderDate(e.target.value)}
              />
            )}
          </div>

          <div className="row">
            <span>Request</span>
            {!edit ? (
              <span>
                {requestDateFormatted ? requestDateFormatted : requestDate}
              </span>
            ) : (
              <input
                type="date"
                value={
                  updateRequestDate
                    ? updateRequestDate
                    : requestDateFormatted
                      ? requestDateFormatted
                      : requestDate
                }
                onChange={(e) => setRequestedDate(e.target.value)}
              />
            )}
          </div>

          <div className="row">
            <span>Active</span>
            {!edit ? (
              <span>
                {activeDateFormatted
                  ? activeDateFormatted
                  : activeDate
                    ? activeDate
                    : "_"}
              </span>
            ) : (
              <input
                type="date"
                value={
                  updateActiveDate
                    ? updateActiveDate
                    : activeDateFormatted
                      ? activeDateFormatted
                      : activeDate
                        ? activeDate
                        : ""
                }
                onChange={(e) => setActiveDate(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
