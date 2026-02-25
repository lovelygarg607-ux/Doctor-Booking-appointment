import React from 'react'
import "./../../styles/dashboard.css"
import { useSelector } from 'react-redux'

const Header = ({ onMenuClick }) => {
    const profileData = useSelector((state) => state.doctorprofile)
    console.log(profileData)
    const handleMenuClick = () => {
        if (typeof onMenuClick === "function") {
            onMenuClick()
        }
        window.dispatchEvent(new Event("doctor-sidebar-open"))
    }

    return (
        <>
            <header className="main-header">
                <div className="header-left">
                    <button
                        type="button"
                        className="sidebar-toggle-btn"
                        onClick={handleMenuClick}
                        aria-label="Toggle sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <div className="search-bar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>

                <div className="header-profile">
                    {profileData?.profileImage ? (<img src={profileData.profileImage} alt="Admin" />) : <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" />}
                    <div className="header-profile-info">
                        {profileData?.userID?.email ? (<p>{profileData?.userID?.email}</p>) : (<p>admin98@gmail.com </p>)}
                        <span>Admin</span>
                    </div>
                </div>

            </header>
        </>
    )
}

export default Header;
