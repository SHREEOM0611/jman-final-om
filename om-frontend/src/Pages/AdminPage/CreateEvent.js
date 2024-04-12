import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./createevent.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

const CreateEvent = () => {
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
        "http://localhost:3000/create-event",
        eventData
      );
      toast.success("Successfully created Event", {
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
      console.error("There was an error creating the event:", error.message);
      toast.error("Failed to create event!!!", {
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
          <h2 class="activity-title">Create Event</h2>
          <div class="create-event-container">
            <div class="event-container-left">
              <div>
                <label class="block font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  class="create-event-input-field"
                  value={eventData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Description:</label>
                <textarea
                  type="text"
                  name="description"
                  class="create-event-textarea-field"
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div>
                <label class="block font-medium">Trainer: </label>
                <input
                  type="text"
                  name="trainer"
                  class="create-event-input-field"
                  value={eventData.trainer}
                  onChange={handleInputChange}
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
                  class="create-event-input-field"
                  value={eventData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Start Time: </label>
                <input
                  type="time"
                  name="startTime"
                  class="create-event-input-field"
                  value={eventData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label class="block font-medium">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  class="create-event-input-field"
                  value={eventData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Location: </label>
                <input
                  type="text"
                  name="location"
                  class="create-event-input-field"
                  value={eventData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label class="block font-medium">Image Url: </label>
                <input
                  type="text"
                  name="imgUrl"
                  class="create-event-input-field"
                  value={eventData.imgUrl}
                  onChange={handleInputChange}
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
            Create Event
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  ) : (
    <h1 style={{ color: "white" }}>you are not an admin!!!</h1>
  );
};

export default CreateEvent;
