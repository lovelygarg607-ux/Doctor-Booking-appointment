import React, { useState } from "react";
import "./../../styles/dashboard.css";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const profileData = useSelector((state) => state.doctorprofile);

  const handleLogout = () => {
    localStorage.removeItem("loginid");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeSidebarMobile = () => {
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={onClose}>
          x
        </button>

        <div className="sidebar-header">
          <h1 className="sidebar-logo">AdminMD</h1>
        </div>

        <div className="sidebar-profile">
          <img
            src={profileData?.profileImage || "https://i.pravatar.cc/150?u=admin"}
            alt="Admin"
          />
          <h3>{profileData?.doctorname || "Dr. Admin"}</h3>
          <p style={{ color: "#fff" }}>
            {profileData?.userID?.email || "admin@gmail.com"}
          </p>
        </div>

        <ul className="sidebar-menu">
          <li className={location.pathname === "/dashboard" ? "sidebar-menu-item active" : "sidebar-menu-item"}>
            <Link to="/dashboard" onClick={closeSidebarMobile}>
              Admin Dashboard
            </Link>
          </li>

          <li className="sidebar-menu-item">
            <div className="menu-link" onClick={toggleDropdown}>
              Doctors
            </div>

            {dropdownOpen && (
              <ul className="ml-menu">
                <li>
                  <Link
                    to={`/editprofile/${localStorage.getItem("loginid")}`}
                    onClick={closeSidebarMobile}
                  >
                    Edit Profile
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className={location.pathname === "/cliniclist" ? "sidebar-menu-item active" : "sidebar-menu-item"}>
            <Link to="/cliniclist" onClick={closeSidebarMobile}>
              Clinics
            </Link>
          </li>

          <li className={location.pathname === "/appointmentlist" ? "sidebar-menu-item active" : "sidebar-menu-item"}>
            <Link to="/appointmentlist" onClick={closeSidebarMobile}>
              Appointments
            </Link>
          </li>

          <li className="sidebar-menu-item">
            <Link to="/settings" onClick={closeSidebarMobile}>
              Settings
            </Link>
          </li>
        </ul>

        <div className="sidebar-menu logout-link">
          <li className="sidebar-menu-item">
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </div>
      </div>

      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;
