import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import MediaCard from "../../components/EventCards/EventCard";
import "./admin.css";
import { TiUserAdd } from "react-icons/ti";
import { MdOutlineEventRepeat } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

function AdminPage() {
  const [eventDetails, setEventDetails] = useState(null);
  const [adminDetails, setAdminDetails] = useState({});

  const jwtToken = localStorage.getItem("adminToken");

  // console.log(jwtToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        // const token = localStorage.getItem("token");
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
          "http://localhost:3000/admin-details",
          config
        );

        // console.log("Admin: ", response);
        setAdminDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch admin details", error);
      }
    };

    fetchAdminDetails();
  }, [jwtToken, navigate]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fetch-events");
        // console.log("Response:", response.data);
        setEventDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchEventDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="admin-page">
      <AdminNavbar />
      <h1>Hello Admin!!</h1>
      <div className="admin-activity">
        <Link to="/create-user">
          <button className="create-user">
            <TiUserAdd className="activity-icon" />
            <p className="activity-title">Create User</p>
          </button>
        </Link>

        <Link to="/create-event">
          <button className="create-event">
            <MdOutlineEventNote className="activity-icon" />
            <p className="activity-title">Create Event</p>
          </button>
        </Link>
        <Link to="/upcoming-event">
          <button className="upcoming-events">
            <MdOutlineEventRepeat className="activity-icon" />
            <p className="activity-title">Upcoming Events</p>
          </button>
        </Link>

        <Link to="/past-events">
          <button className="past-events">
            <MdEventAvailable className="activity-icon" />
            <p className="activity-title">Past Events</p>
          </button>
        </Link>
        <div></div>
      </div>
    </div>
  );
}

export default AdminPage;
