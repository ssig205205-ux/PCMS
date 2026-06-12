import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../useAuth";

export default function AddCForm() {
  const nevigate = useNavigate();
  const [name, setName] = useState("");
  const [nrc, setNrc] = useState("");
  const [phone, setPhone] = useState("");
  const [secondPhone, setSecondPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showLocationOnUi, setShowLocation] = useState("");
  const [location, setLocation] = useState("");
  const [plan, setPlan] = useState("");
  const [requestDate, setRequestedDate] = useState("");
  const [advanceMonth, setAdvanceMonth] =useState("");
  const [promotion, setPromotion] = useState("");
  const [status, setStatus] = useState(undefined);
  const [salePerson,setSalePerson] = useState("");
  const [userData, setuserData] = useState([]);
  const [userNames,setUserName] = useState([]);
  const { user } = useAuth();
  const userType = user?.user?.UserType;

   
     
      useEffect(()=>{

    const fetchData = async () => {  
       
        const response = await fetch("https://cms-backend-xyb9.onrender.com/api/admin", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("something is wrong");
        }
        const data = await response.json();
        console.log(data)
        setuserData(data);
        if(userType === "admin"){
          const names = userData.map((item)=>item.name);
          setUserName(names);
          console.log(names)
        }

      }; 
      fetchData();
      },[userData.length]);
 
  const handelChangeName = (e) => {
    setName(e.target.value);
  };

  const handelChangeNrc = (e) => {
    setNrc(e.target.value);
  };

  const handelChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handelChangeSphone = (e) => {
    setSecondPhone(e.target.value);
  };

  const handelChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handelChangeLocation = (e) => {
    const showLocation = e.target.value;
    setShowLocation(showLocation);
    const location = e.target.value
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    setLocation({ lat: location[0], lng: location[1] });
    //setLocation(e.target.value);
  };

  const handelChangePlan = (e) => {
    setPlan(e.target.value);
  };

  const handelChangeDate = (e) => {
    setRequestedDate(e.target.value);
  };
  const handelChangeAdvanceMonth = (e) => {
    setAdvanceMonth(e.target.value);
  };
  const handelChangePromotion = (e) => {
    setPromotion(e.target.value);
  };
  const handelChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleChangeSaleP =(e)=>{
    setSalePerson(e.target.value);
  }

  //this fun will handle the fatch post function to send new userss
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = {
      name,
      nrc,
      phone,
      secondPhone,
      address,
      location,
      plan,
      requestDate,
      advanceMonth,
      promotion,
      status,
      userName: salePerson
    };
    if (
      !name ||
      !nrc ||
      !phone ||
      !address ||
      !location ||
      !plan ||
      !requestDate ||
      !advanceMonth
    ) {
      alert("Please fill in all required fields!");
      return;
    }
    try {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
        credentials: "include",
      });
      const data = await response.json();
      console.log("Customer added:", data);
      alert("Customer added successfully!");
      // Reset form fields after successful submission
      setName("");
      setNrc("");
      setPhone("");
      setSecondPhone("");
      setAddress("");
      setShowLocation("");
      setPlan("");
      setRequestedDate("");
      setAdvanceMonth("");
      setPromotion("");
      setStatus(undefined);
      setSalePerson("")
      nevigate("/");
    } catch (error) {
      console.error("Error adding customer:", error);
    }

    // Here you can send newCustomer to your backend API to save it in the database
  };

  return (
    <div className="formContainer">
      <form className="addCForm" onSubmit={handleSubmit} id="addCForm">
        <label>Name {!name && <span className="required">*</span>}</label>
        <input
          type="text"
          onChange={handelChangeName}
          placeholder="Enter Name"
          value={name}
          required
        />

        <label>NRC Number{!nrc && <span className="required">*</span>}</label>
        <input
          type="text"
          onChange={handelChangeNrc}
          placeholder="Enter NRC Number"
          value={nrc}
          required
        />

        <label>Phone{!phone && <span className="required">*</span>}</label>
        <input
          type="tel"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={handelChangePhone}
          value={phone}
          placeholder="Enter Phone"
          required
        />

        <label>
          Second Phone{!secondPhone && <span className="required">*</span>}
        </label>
        <input
          type="tel"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={handelChangeSphone}
          value={secondPhone}
          placeholder="Enter Second Phone"
        />

        <label>Address{!address && <span className="required">*</span>}</label>
        <input
          type="text"
          onChange={handelChangeAddress}
          value={address}
          placeholder="Enter Address"
          required
        />

        <label>
          Location (lat, long){!location && <span className="required">*</span>}
        </label>
        <input
          type="text"
          onChange={handelChangeLocation}
          value={showLocationOnUi}
          placeholder="Enter Location"
          required
        />

        <label>Plan{!plan && <span className="required">*</span>}</label>
        <select onChange={handelChangePlan} value={plan} required>
          <option value="">Select Plan</option>
          <option value="20mbps">20mbps</option>
          <option value="30mbps">30mbps</option>
          <option value="40mbps">40mbps</option>
          <option value="50mbps">50mbps</option>
          <option value="100mbps">70mbps</option>
          <option value="100mbps">100mbps</option>
          <option value="150mbps">200mbps</option>
        </select>

        <label>
          Requested Date{!requestDate && <span className="required">*</span>}
        </label>
        <input
          type="date"
          onChange={handelChangeDate}
          value={requestDate}
          required
        />

        <label>
          Advance Month{!advanceMonth && <span className="required">*</span>}
        </label>
        <input
          type="number"
          min="0"
          onChange={handelChangeAdvanceMonth}
          value={advanceMonth}
          placeholder="Enter Advance Month"
          required
        />

        <label>Promotions</label>
        <select onChange={handelChangePromotion} value={promotion}>
          <option value="">Select Promotion</option>
          <option value="300 meter coverage">300 meter coverage</option>
          <option value="+1 month">+1 month</option>
          <option value="+2 months">+2 months</option>
        </select>

        <label>Status</label>
        <select onChange={handelChangeStatus} value={status}>
          <option value="Pending">Select Status</option>
          <option value="Active">Active</option>
          <option value="Cancel">Cancel</option>
          <option value="Pending">Pending</option>
        </select>
        {userType === "admin" ? (
          <>
            <label>
              SalePerson
              {!requestDate && <span className="required">*</span>}
            </label>

            <select onChange={handleChangeSaleP} value={salePerson} required>
              <option value="">Select Sale Person</option>
              {userNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>  
          </>
        ) : (
          <></>
        )}
      </form>
      <hr></hr>
      <div className="buttonGroup">
        <Link to="/">
          {" "}
          <button className="cancelButton">Cancel</button>
        </Link>
        <button className="addCButton" type="submit" form="addCForm">
          Add
        </button>
      </div>
    </div>
  );
}
