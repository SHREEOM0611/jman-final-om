import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

function CreateUserPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    // password: "",
  });
  const navigate = useNavigate();

  const adminToken = localStorage.getItem("adminToken");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user", userData);

      toast.success("Successfully created User", {
        autoClose: 1000,
      });

      setUserData({ name: "", email: "" });
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("User already present", {
          autoClose: 1000,
        });
        setUserData({ name: "", email: "" });
      } else {
        console.error("There was an error creating the user:", error.message);
        toast.error("Failed to create User", {
          autoClose: 1000,
        });
        setUserData({ name: "", email: "" });
      }
    }
  };

  return adminToken ? (
    <>
      <AdminNavbar />
      <div class="admin-form-container">
        <h1 class="admin-page-heading">Welcome, Admin!</h1>
        <form onSubmit={handleSubmit} class="create-event-form space-y-4">
          <h2 class="activity-title">Create User</h2>
          <div class="create-event-container">
            <div class="event-container-left">
              <div class="form-group">
                <label class="block font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                  class="create-event-input-field "
                />
              </div>
              <div class="form-group">
                <label class="block font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                  class="create-event-input-field "
                />
              </div>
            </div>
          </div>
          <button type="submit" class="create-event-submit-button ">
            Create User
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  ) : (
    <h1 class="admin-page-heading">get the fuck out!</h1>
  );
}

export default CreateUserPage;
