import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Nav = () => {
  // const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <div className="website">
      <ul className="nav-ul">
        {!isAuthenticated ? (
          <>
            <img alt="logo" className="logo" src={logo} />
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/solution">Solution</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <li>
            {/* <button onClick={handleLogout} className="logout-button">
              Logout
            </button> */}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
