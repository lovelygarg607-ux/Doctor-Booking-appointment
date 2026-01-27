import React, { useState } from "react";
import "./../styles/form.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../images/images/shape-reg-provider-3.webp";
import Navbar from "../components/Landing Page copy/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const [formvalue, setFormvalue] = useState({
    email: "",
    password: "",
  });

  const togglepassword = () => {
    setShowpassword(!showpassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalue({
      ...formvalue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const loginresponse = await axios.post(
        "https://doctor-booking-appointment-6n0v.onrender.com/Hospital/user/login",
        formvalue,
 
      );

      if (loginresponse.data.status === "success") {
        localStorage.setItem("token", loginresponse.data.token);
        localStorage.setItem("loginid", loginresponse.data.loginid);
        localStorage.setItem("usertype", loginresponse.data.role);

        const role = loginresponse.data.role.toLowerCase();
        const isCreated = loginresponse.data.isprofilecreated;

        if (role === "doctor") navigate(isCreated ? "/dashboard" : "/doctor");
        else if (role === "patient")
          navigate(isCreated ? "/patientdashboard" : "/patient");
        else if (role === "clinic")
          navigate(isCreated ? "/clinicdashboard" : "/addclinic");

        Swal.fire({
          title: loginresponse.data.message,
          icon: "success",
        });

        setFormvalue({ email: "", password: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: loginresponse.data.message,
        });
      }
    } catch (error) {
      console.log("login error", error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Navbar />

      <div className="login-main-container">
        <div className="login-card-wrapper">
          <img src={loginImage} alt="login" />

          <div className="login-right-section">
            <div className="login-card">
              <h2>Login</h2>
              <p className="subtitle">Welcome Back</p>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={formvalue.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group password-group">
                  <label>Password</label>
                  <input
                    type={showpassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    required
                    value={formvalue.password}
                    onChange={handleChange}
                  />
                  <span className="eye-icon" onClick={togglepassword}>
                    {showpassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button type="submit" className="login-btn">
                  Login
                </button>

                <p className="signup-text">
                  Don’t have an account? <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
