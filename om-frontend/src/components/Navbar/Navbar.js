import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import axios from "axios";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("userToken");

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!jwtToken) {
          alert("Please Login!!!");
          navigate("/");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const response = await axios.get(
          "http://localhost:3000/user-details",
          config
        );

        // console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [jwtToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <div className="navbar-left">
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all-events" className="nav-link">
              Upcoming Events
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/user-calendar" className="nav-link">
              User Calendar
            </Link>
          </li>
        </div>
        <div className="navbar-right">
          <li className="nav-item">
            <Link to={`/user/profile/${userData._id}`} className="nav-link">
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <TbLogout
              className="nav-button"
              onClick={handleLogout}
              title="LogOut"
            />
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
