import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../AdminPage/admin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/reset-password/${token}`,
        { newPassword }
      );

      toast.success("Password successfully changed", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/");
      });
    } catch (error) {
      toast.error("Unable to update password", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div
      class="flex items-center justify-center min-h-screen bg-gray-100"
      style={{ backgroundColor: "#141625" }}
    >
      <div class="admin-form-container">
        <h3 class="text-2xl font-bold text-center">Reset your password</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="mt-4">
            <div>
              <label for="password" class="block font-medium">
                New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                class="create-event-input-field"
                required
              />
            </div>
            <div class="flex items-baseline justify-between">
              <button type="submit" class="create-event-submit-button">
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
