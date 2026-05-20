import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useState } from "react";
import { useAuth } from "../../useAuth.jsx";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("")
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async () => {
      try {
        const response = await fetch("https://cms-backend-xyb9.onrender.com/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log("Login response:", data);
        if (!response.ok) {
          setError(data.error);
          return;
        }
        setUser(data);
        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };
    login();
  };

  return (
    <div className="container">
      <div className="login-card">
        <Link to="/">
          <GoArrowLeft className="Arrow2" />
        </Link>
        <div className="login-header">
          <h1>CMS</h1>
          <p>Sign in to your account</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>

          { error &&
            <div className="errorMassage">
              <p>{error}</p>
            </div>
          }

          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <p className="footer">
          Don’t have an account?{" "}
          <Link to="/signup">
            {" "}
            <span>Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

function SignupPage() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Team, setTeam] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setError("")
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("")
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("")
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("")
  };

  const handleTeamChange = (e)=>{
    setTeam(e.target.value)
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const response = await fetch("https://cms-backend-xyb9.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, Team }),
      });
      const data = await response.json();
      console.log("Signup response:", data);
      if (!response.ok) {
        alert(data.error);
        setError(data.error);
        return;
      }
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <Link to="/">
          <GoArrowLeft className="Arrow2" />
        </Link>
        <div className="login-header">
          <h1>CMS</h1>
          <p>Create your account</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleFullNameChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
           <div className="form-group">
            <label>Team</label>
            <select required onChange={handleTeamChange}>
              <option value="Team-A">Team-A</option>
              <option value="Team-B">Team-B</option>
              <option value="Team-C">Team-C</option>
              <option value="Team-D">Team-D</option>
              <option value="Team-E">Team-E</option>
              <option value="Team-F">Team-F</option>
              <option value="Team-G">Team-G</option>
              <option value="Team-H">Team-H</option>
              <option value="Team-Condo">Team-Condo</option>
            </select>
          </div>
          { error &&
            <div className="errorMassage">
              <p>{error}</p>
            </div>
          }
          
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        <p className="footer">
          Already have an account?
          <Link to="/login">
            {" "}
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export { LoginPage, SignupPage };
