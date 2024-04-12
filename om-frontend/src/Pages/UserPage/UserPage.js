import axios from "axios";
import React, { useEffect, useState } from "react";
import "./userpage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../Images/login-form-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import MediaCard from "../../components/EventCards/EventCard";
import Navbar from "../../components/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserPage() {
  const [userDetails, setUserDetails] = useState({});
  const jwtToken = localStorage.getItem("userToken");

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

  const [eventDetails, setEventDetails] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [trainerSearchQuery, setTrainerSearchQuery] = useState("");
  const [eventSearchQuery, setEventSearchQuery] = useState("");
  const [topUpcomingEvents, setTopUpcomingEvents] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(null);

  // const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState(null);
  // let filteredEvents = [];

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fetch-events");
        console.log("Response:", response.data);
        setEventDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchEventDetails();
  }, []);

  useEffect(() => {
    if (eventDetails) {
      const upcoming = eventDetails.filter(
        (event) => new Date() < new Date(event.date)
      );
      setUpcomingEvents(upcoming);
      filterTopEvents(upcoming);
    }
  }, [eventDetails]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        console.log(userDetails._id);
        const response = await axios.get(
          `http://localhost:3000/user-event-fetch/${userDetails._id}`
        );
        // console.log("Successfully fetched registered events: ", response);
        setRegisteredEvents(response.data);
        console.log("registeredEvents: ", registeredEvents);
      } catch (error) {
        console.log("Error fetching Registered Events", error);
      }
    };

    fetchRegisteredEvents();
  }, [userDetails]);

  const filteredEvents = upcomingEvents
    ? upcomingEvents.filter((event) => {
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

  // console.log("upcoming: ", upcomingEvents);

  const registeredUpcomingEvents = upcomingEvents?.filter((event) =>
    registeredEvents?.some(
      (registeredEvent) => registeredEvent.eventId === event._id
    )
  );

  console.log(" registered upcoming events: ", registeredUpcomingEvents);

  const filterTopEvents = (upcomingEvents) => {
    upcomingEvents?.sort((a, b) => new Date(a.date) - new Date(b.date));
    let topEvents = [];

    for (var i = 0; i < Math.min(5, upcomingEvents?.length); i++) {
      topEvents.push(upcomingEvents[i]);
    }
    setTopUpcomingEvents(topEvents);
    // console.log("top events: ", topUpcomingEvents);
  };

  return (
    <>
      <Navbar />
      <div class="user-page-container">
        <div class="user-page">
          <div>
            <Carousel
              id="slider"
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              emulateTouch={true}
              autoPlay={true}
              interval={5000}
              width={"100%"} // Set width to fill its container
              height={"100px"}
            >
              <div>
                <img src={img1} />
              </div>
              <div>
                <img src={img1} />
              </div>
              <div>
                <img src={img1} />
              </div>
            </Carousel>
          </div>

          <div>
            <div className="subheading">
              <h1 class="user-page-title">Events in Queue!</h1>
            </div>
            <div className="userpage-events-container">
              <div className="userpage-upcoming-events">
                {topUpcomingEvents?.map((event, index) => (
                  <Link to={`/event/${event._id}`}>
                    <MediaCard key={index} eventDetail={event} isPast={false} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 class="user-page-title">Registered Events</h1>
              <div className="userpage-events-container">
                <div className="userpage-registered-events">
                  {registeredUpcomingEvents?.map((event, index) => (
                    <MediaCard key={index} eventDetail={event} isPast={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default UserPage;
