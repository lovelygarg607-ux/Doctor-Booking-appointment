import React from 'react'
import "./../../styles/dashboard.css"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const profileData = useSelector((state) => state.doctorprofile)
    console.log(profileData)

    return (
        <header className="main-header">

            <div className="header-left">
                <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
                    <Link to={"/"} href="#home" onClick={() => setMenuOpen(false)}>Home</Link>
                    <a href={"/about"} onClick={() => setMenuOpen(false)}>About Us</a>
                    <a href={"/department"} onClick={() => setMenuOpen(false)}>Departments</a>
                    <a href="#research" onClick={() => setMenuOpen(false)}>Doctors</a>
                    <a href={"/blog"} onClick={() => setMenuOpen(false)}>Blog</a>
                    <a href={"/contact"} onClick={() => setMenuOpen(false)}>Contact</a>
                </nav>

                <div
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span />
                    <span />
                    <span />
                </div>





                <div className="search-bar">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>

                    <input
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>

            <div className="header-profile">
                {profileData?.profileImage
                    ? <img src={profileData.profileImage} alt="Admin-photo" />
                    : <img src="https://i.pravatar.cc/150?u=admin" alt="Admin Photo" />
                }

                <div className="header-profile-info">
                    {profileData?.userID?.email
                        ? <p>{profileData.userID.email}</p>
                        : <p>admin98@gmail.com</p>
                    }
                    <span>Admin</span>
                </div>
            </div>



        </header>


    )
}

export default Header;