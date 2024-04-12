import React, { useEffect, useState } from "react";
import "./eventpage.css";
import img1 from "../../Images/login-form-img.jpg";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventPage = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  const [isCapacityFull, setIsCapacityFull] = useState(false);

  const jwtToken = localStorage.getItem("userToken");
  const userToken = localStorage.getItem("userToken");

  // console.log(jwtToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
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
          "http://localhost:3000/user-details",
          config
        );

        // console.log(response);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [jwtToken, navigate]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/fetch-event/${eventId}`
        );
        setEventData(response.data);

        if (eventData.registered >= eventData.capacity) {
          setIsCapacityFull(true);
        }

        // Check if the user is already registered for the event
        const registeredEvents = await axios.get(
          `http://localhost:3000/user-event-fetch/${userDetails._id}`
        );
        const isEventRegistered = registeredEvents.data.some(
          (event) => event.eventId === eventId
        );
        setIsRegistered(isEventRegistered);

        // Check if the user is already interested in the event
        const interestedEvents = await axios.get(
          `http://localhost:3000/user-event-interest-fetch/${userDetails._id}`
        );
        const isEventInterested = interestedEvents.data.some(
          (event) => event.eventId === eventId
        );
        setIsInterested(!isEventRegistered && !isEventInterested);
      } catch (error) {
        console.error("Error fetching the event: ", error);
      }
    };

    fetchEvent();
  }, [eventId, userDetails._id]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/user-event-add/${userDetails._id}`,
        { eventId: eventData._id }
      );

      if (response.status === 400) {
        toast.error("Event already registered", {
          autoClose: 1000,
        });
      }

      toast.success("Event added for user", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/user");
      }, 1500);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Event already registered", {
          autoClose: 1000,
        });
      } else {
        toast.error("Error adding event", {
          autoClose: 1000,
        });
      }
    }
  };

  const handleInterest = async () => {
    try {
      if (eventData.registered === eventData.capacity - 1) {
        const registrationFullEmailResponse = await axios.post(
          "http://localhost:3000/registration-full-email",
          { eventId: eventId }
        );
      }

      const response = await axios.post(
        `http://localhost:3000/user-event-interest/${userDetails._id}`,
        { eventId: eventId }
      );

      toast.success("Event interest added", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/user");
      }, 1500);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Event interest already added", {
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to add event interest", {
          autoClose: 1000,
        });
      }
    }
  };

  return userToken ? (
    <>
      <Navbar />
      <div className="event-page-container">
        <div className="main-container">
          <div className="image-container">
            <img
              className="learning-image"
              src={eventData.imgUrl}
              alt="Event Name"
            />
          </div>
          <div className="event-detail-container">
            <h2 className="event-heading">{eventData.name}</h2>
            <div className="event-details">
              <p className="event-description">{eventData.description}</p>
              <div className="event-info">
                <p>
                  <strong>Date:</strong> {eventData.date}
                </p>
                <p>
                  <strong>Time:</strong> {eventData.startTime} -{" "}
                  {eventData.endTime}
                </p>
                <p>
                  <strong>Location:</strong> {eventData.location}
                </p>
                <p>
                  <strong>Trainer:</strong> {eventData.trainer}
                </p>
                <div style={{ display: "flex" }}>
                  <strong>Training Resources: </strong>
                  <Link to={eventData.resourceLink} target="_blank">
                    <strong> Link</strong>
                  </Link>
                </div>
                <p>
                  <strong>Domain:</strong> {eventData.domain}
                </p>
              </div>
            </div>
            <div className="event-options">
              {!isRegistered && (
                <button
                  className="register-button"
                  onClick={handleRegister}
                  disabled={isRegistered || isCapacityFull}
                >
                  Register
                </button>
              )}
              {isInterested && (
                <button className="interest-button" onClick={handleInterest}>
                  Interested
                </button>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  ) : (
    <h1 style={{ color: "white" }}>you are not an user!!!</h1>
  );
};

export default EventPage;
