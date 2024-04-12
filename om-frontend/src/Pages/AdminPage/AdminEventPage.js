import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./adminEventpage.css";

const AdminEventPage = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [adminDetails, setAdminDetails] = useState(null);
  const [EventInterestedUsers, setEventInterestedUsers] = useState(null);
  const [usersDetails, setUsersDetails] = useState([]);

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

        setAdminDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch admin details", error);
      }
    };

    fetchAdminDetails();
  }, [jwtToken, navigate]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/fetch-event/${eventId}`
        );

        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching the event: ", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchInterestedUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/event-interests/${eventId}`
        );

        setEventInterestedUsers(response.data);
      } catch (error) {
        console.error("Error fetching the event: ", error);
      }
    };

    fetchInterestedUser();
  }, [eventId]);

  useEffect(() => {
    const fetchUsersDetails = async () => {
      try {
        const promises = EventInterestedUsers.map(async (interest) => {
          const response = await axios.get(
            `http://localhost:3000/fetch-user-detail/${interest.userId}`
          );
          return response.data;
        });
        const usersDetails = await Promise.all(promises);
        setUsersDetails(usersDetails);
      } catch (error) {
        console.error("Error fetching users details: ", error);
      }
    };

    if (EventInterestedUsers?.length > 0) {
      fetchUsersDetails();
    }
  }, [EventInterestedUsers]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    // <div className="event-page-container">
    //   <div className="admin-event-main-container">
    //     <div className="admin-event-details-container">
    //       <div className="admin-event-image-container">
    //         <img
    //           className="learning-image"
    //           src={eventData.imgUrl}
    //           alt="Event Name"
    //         />
    //       </div>
    // <div className="admin-event-detail-container">
    //   <h2 className="event-heading">{eventData.name}</h2>
    //   <div className="event-info">
    //     <p>
    //       <strong>Date:</strong> {eventData.date}
    //     </p>
    //     <p>
    //       <strong>Time:</strong> {eventData.startTime} -{" "}
    //       {eventData.endTime}
    //     </p>
    //     <p>
    //       <strong>Location:</strong> {eventData.location}
    //     </p>
    //     <p>
    //       <strong>Trainer:</strong> {eventData.trainer}
    //     </p>
    //     <p>
    //       <strong>Capacity:</strong> {eventData.capacity}
    //     </p>
    //     <p>
    //       <strong>Registered:</strong> {eventData.registered}
    //     </p>
    //   </div>
    //       </div>
    //     </div>
    //     <div className="description-users-container">
    //   <div>
    //     <h1>Description:</h1>
    //     <p className="admin-event-description">{eventData.description}</p>
    //   </div>
    //   <div className="users-interested-container">
    //     {usersDetails?.map((user, index) => (
    //       <div key={index}>{user.name}</div>
    //     ))}
    //   </div>
    // </div>
    //   </div>
    //   <div>
    //     <button onClick={handleLogout}>LogOut</button>
    //   </div>
    // </div>
    <div className="admin-page">
      <div className="admin-event-page-container">
        <div className="admin-event-main-container">
          <div className="admin-event-image-container">
            <img
              className="learning-image"
              src={eventData.imgUrl}
              alt="Event Name"
            />
          </div>
          <div className="admin-event-detail-container">
            <h2 className="event-heading">{eventData.name}</h2>
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
                <strong>Domain:</strong> {eventData.domain}
              </p>
              <p>
                <strong>Trainer:</strong> {eventData.trainer}
              </p>
              <p>
                <strong>Capacity:</strong> {eventData.capacity}
              </p>
              <p>
                <strong>Registered:</strong> {eventData.registered}
              </p>
            </div>
          </div>
        </div>
        <div className="admin-event-details">
          <div className="description-container">
            <p className="description-heading">Description</p>
            <div className="admin-event-description text-gray-300">
              {eventData.description}

              <div style={{ display: "flex" }}>
                <strong>Training Resources: </strong>
                <Link to={eventData.resourceLink} target="_blank">
                  <strong>Link</strong>
                </Link>
              </div>
            </div>
          </div>
          <div className="users-interested-container">
            <p className="description-heading">Interested User</p>
            <div className="text-gray-300 flex flex-col gap-4 ">
              {usersDetails?.map((user, index) => (
                <div key={index}>{user.name}</div>
              ))}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminEventPage;
