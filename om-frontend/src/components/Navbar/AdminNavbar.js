import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import axios from "axios";
import { TbLogout } from "react-icons/tb";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("adminToken");

  const [adminData, setAdminData] = useState({});

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
        setAdminData(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [jwtToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin-calendar" className="nav-link">
            Admin Calendar
          </Link>
        </li>

        <li className="nav-item">
          <TbLogout
            className="nav-button"
            onClick={handleLogout}
            title="LogOut"
          />
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
