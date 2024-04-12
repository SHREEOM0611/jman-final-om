import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

const EditEventPage = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    trainer: "",
    imgUrl: "",
    capacity: 0,
    registered: 0,
    resourceLink: "",
    domain: "",
  });

  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchCurrentEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/fetch-event/${eventId}`
        );

        setEventData(response.data);
      } catch (error) {
        console.error(`Failed to fetch user details ${eventId}`, error);
      }
    };

    fetchCurrentEvent();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/edit-event/${eventId}`,
        eventData
      );

      toast.success("Successfully edited the Event", {
        autoClose: 1000,
      });

      setTimeout(() => {
        setEventData({
          name: "",
          description: "",
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          trainer: "",
          imgUrl: "",
          capacity: 0,
          registered: 0,
          resourceLink: "",
          domain: "",
        });

        navigate("/admin");
      }, 1500);
    } catch (error) {
      console.error("There was an error updating the event:", error.message);
      toast.error("Failed to edit event!!!", {
        autoClose: 1000,
      });
    }
  };

  return adminToken ? (
    <>
      <AdminNavbar />
      <div class="admin-form-container">
        <h1 class="admin-page-heading">Welcome, Admin!</h1>
        <form class="space-y-4 create-event-form">
          <h2 class="activity-title">Update Event</h2>
          <div class="create-event-container">
            <div class="event-container-left">
              <div>
                <label class="block font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  class="create-event-input-field"
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Description:</label>
                <textarea
                  type="text"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  class="create-event-textarea-field"
                  required
                ></textarea>
              </div>
              <div>
                <label class="block font-medium">Trainer: </label>
                <input
                  type="text"
                  name="trainer"
                  value={eventData.trainer}
                  onChange={handleInputChange}
                  class="create-event-input-field"
                  required
                />
              </div>
            </div>
            <div class="event-container-right">
              {/* <!-- Right column --> */}
              <div>
                <label class="block font-medium">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  class="create-event-input-field"
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Start Time: </label>
                <input
                  type="time"
                  name="startTime"
                  value={eventData.startTime}
                  onChange={handleInputChange}
                  class="create-event-input-field"
                  required
                />
              </div>
              <div>
                <label class="block font-medium">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={eventData.endTime}
                  onChange={handleInputChange}
                  class="create-event-input-field"
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Location: </label>
                <input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  class="create-event-input-field"
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Image Url: </label>
                <input
                  type="text"
                  name="imgUrl"
                  value={eventData.imgUrl}
                  onChange={handleInputChange}
                  class="create-event-input-field"
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Capacity: </label>
                <input
                  type="number"
                  name="capacity"
                  class="create-event-input-field"
                  value={eventData.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Registered: </label>
                <input
                  type="number"
                  name="registered"
                  class="create-event-input-field"
                  value={eventData.registered}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label class="block font-medium text-black">
                  Resource Link:
                </label>
                <input
                  type="text"
                  name="resourceLink"
                  class="bg-gray-200"
                  value={eventData.resourceLink}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label class="block font-medium text-black">Domain:</label>
                <input
                  type="text"
                  name="domain"
                  class="bg-gray-200"
                  value={eventData.domain}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="create-event-submit-button"
            onClick={handleSubmit}
          >
            Update Event
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  ) : (
    <h1 style={{ color: "white" }}>You are not an admin!!!</h1>
  );
};

export default EditEventPage;
