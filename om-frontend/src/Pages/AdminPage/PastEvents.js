import React, { useEffect, useState } from "react";
import MediaCard from "../../components/EventCards/EventCard.js";

import axios from "axios";
import "./admin.css";
import AdminNavbar from "../../components/Navbar/AdminNavbar.js";

const PastEvents = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [pastEvents, setPastEvents] = useState(null);
  const [trainerSearchQuery, setTrainerSearchQuery] = useState("");
  const [eventSearchQuery, setEventSearchQuery] = useState("");

  const adminToken = localStorage.getItem("adminToken");

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

  useEffect(() => {
    if (eventDetails) {
      const past = eventDetails.filter(
        (event) => new Date() > new Date(event.date)
      );

      setPastEvents(past);
    }
  }, [eventDetails]);

  const handleTrainerSearchChange = (e) => {
    setTrainerSearchQuery(e.target.value);
  };

  const handleEventSearchChange = (e) => {
    setEventSearchQuery(e.target.value);
  };

  const filteredEvents = pastEvents
    ? pastEvents.filter((event) => {
        const eventNameMatch =
          event.name.toLowerCase().indexOf(eventSearchQuery.toLowerCase()) !==
          -1;
        const trainerNameMatch =
          event.trainer
            .toLowerCase()
            .indexOf(trainerSearchQuery.toLowerCase()) !== -1;

        return eventNameMatch && trainerNameMatch;
      })
    : [];

  return adminToken ? (
    <div className="admin-page">
      <AdminNavbar />

      <h1>Past Events!</h1>
      <div className="admin-learning">
        <div className="filtered-search">
          <input
            type="text"
            placeholder="Search by Trainer Name"
            value={trainerSearchQuery}
            onChange={handleTrainerSearchChange}
          />

          <input
            type="text"
            placeholder="Search by Event Name"
            value={eventSearchQuery}
            onChange={handleEventSearchChange}
          />
        </div>
        <div className="upcoming-events-container">
          {filteredEvents.map((event, index) => (
            <MediaCard
              key={index}
              eventDetail={event}
              isPast={true}
              isAdmin={true}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h1 style={{ color: "white" }}>You are not an admin!!!</h1>
  );
};

export default PastEvents;
