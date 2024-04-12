import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import loginimg from "../../Images/login-pic.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem(`${data.userType}Token`, data.token);
      // Redirect based on user type
      if (data.userType === "admin") {
        toast.success("Successful Login as Admin", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        toast.success("Successful Login as User", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/user");
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to Login", {
        autoClose: 1000,
      });
    }
  };

  return !adminToken && !userToken ? (
    <div className="login-page">
      <div class="main-container">
        <div class="image-container">
          {/* <!-- Image related to learning goes here --> */}
          <img src={loginimg} alt="Learning Image" class="learning-image" />
        </div>
        <div class="login-form-container">
          <h2 class="login-heading">Login</h2>
          <form class="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              required
              class="login-input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
              required
              class="login-input"
            />
            <button type="submit" class="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  ) : (
    <div className="already-logged-in-container">
      <h1 className="logged-in-message">You are already logged in</h1>
      {adminToken && (
        <Link to="/admin">
          <button className="go-homepage login-button">Go to home page</button>
        </Link>
      )}
      {userToken && (
        <Link to="/user">
          <button className="go-homepage login-button">Go to home page</button>
        </Link>
      )}
    </div>
  );
};

export default LoginPage;
