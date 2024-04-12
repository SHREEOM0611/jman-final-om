import React from "react";
import UpcomingEvents from "./UpcomingEvents";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

const UpcomingEventsAdmin = () => {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? (
    <>
      <AdminNavbar />
      <UpcomingEvents isAdmin={true} />
    </>
  ) : (
    <h1 style={{ color: "white" }}>You are not an admin!!!</h1>
  );
};

export default UpcomingEventsAdmin;
