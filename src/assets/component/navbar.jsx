import userIcon from "../userIcon.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar({ activeStatus }) {
  const { user } = useAuth();
  console.log("Navbar user:", user.user.name);

  let home = "";
  let lead = "";
  let about = "";

  if (activeStatus) {
    if (activeStatus === "home") {
      home = "activeNav";
    }
    if (activeStatus === "lead") {
      lead = "activeNav";
    }
    if (activeStatus === "about") {
      about = "activeNav";
    }
    
  }

  const login = !!user;
  const userNameUnslice = user?.user?.name;
  const userName = userNameUnslice ? userNameUnslice.slice(0, 3) : "Gest";
  const userType = user?.user?.UserType;
  console.log(userType)

  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) {
      return; // If user cancels logout, do nothing
    }
    const response = await fetch("https://cms-backend-xyb9.onrender.com/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      navigate("/login"); // Redirect to login page after logout
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <div className="navbar">
      <div className="navTitle">
        <img className="navImg" src={userIcon} alt="img" />
        <h1>CMS</h1>
      </div>
      <div className="tabs">
        <nav className="navlist">
          <ul>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li className={home}>Home</li>
            </Link>
            <Link to="/lead" style={{ textDecoration: "none" }}>
              <li className={lead}>Lead</li>
            </Link>
            { userType==="user" ? 
            <Link to="/about" style={{ textDecoration: "none" }}>
            <li className={about}>About</li>
            </Link> :
            <Link to="/admin" style={{ textDecoration: "none" }}>
            <li className={about}>Admin</li>
            </Link>
            }
          </ul>
        </nav>
      </div>
      <div className="navSigin">
        {!login ? (
          <Link to="/login">
            <button className="loginbt">Login</button>
          </Link>
        ) : (
          <div className="userandlogout">
            <p className="userName">{userName}</p>
            <button className="logoutbt" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
