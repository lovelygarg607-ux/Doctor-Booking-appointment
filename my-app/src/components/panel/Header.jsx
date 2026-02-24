import React, { useState } from 'react'
import "./../../styles/dashboard.css"
import { useSelector } from 'react-redux'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const profileData = useSelector((state)=> state.doctorprofile)

  return (
    <header className="main-header">
      <div className="header-left">
        <button
          className="menu-btn"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header-profile">
        <img 
          src={profileData?.profileImage || "https://i.pravatar.cc/150?u=admin"} 
          alt="Admin" 
        />
      </div>
    </header>
  )
}

export default Header
