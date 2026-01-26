
import { useSelector } from "react-redux"
import "./../styles/dashboard.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import user from "./../images/images/user.webp"

const PatientSidebar = () => {
  const Navigate = useNavigate()
  const profileData = useSelector((state) =>state.patientprofile)
  console.log(profileData)


  const [isOpen, setIsOpen] = useState(false)

  const [active, setactive] = useState("")


  const toggledropdown = () => {
    setIsOpen(!isOpen)
  }

  const handelLogout = () => {
    localStorage.setItem("loginid", "");
    localStorage.setItem("role", "");
    Navigate("/")

  }


  return (
    <>
      <div className='main-sidebar' > <div className="sidebar"  >
        <div className="sidebar-header">
          <svg className="sidebar-logo-icon" xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <h1 className="sidebar-logo">PatientMD</h1>
        </div>
        <div className="sidebar-profile">
                 <img src={profileData?.patientImage || "https://i.pravatar.cc/150?u=admin"} alt="Admin Photo" />

           <h3 > {profileData?.patientname || " Dr. Admin"}</h3>
          <p style={{ color: '#fff' }}>{profileData?.userID?.email}</p>

        </div>
        <div className="sidebar-menu">
          <li className="menu-title" style={{ color: '#fff' }}>Main</li>
          <li className={active === "dashboard" ? "sidebar-menu-item active" : "sidebar-menu-item"} onClick={() => setactive(active === "Dashboard" ? "" : "dashboard")}>
            <Link to={"/patientdashboard"}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x={3} y={3} width={7} height={7} />
                <rect x={14} y={3} width={7} height={7} />
                <rect x={14} y={14} width={7} height={7} />
                <rect x={3} y={14} width={7} height={7} />
              </svg>
              <span>Patient Dashboard</span>
            </Link>
          </li>
          <li className={active === "Patient" ? "sidebar-menu-item active" : "sidebar-menu-item"} onClick={() => setactive(active === "Patient" ? "" : "Patient")}>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx={9} cy={7} r={4} />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Patient</span>
              <i className="fa-solid fa-caret-down" onClick={toggledropdown} />


            </a>
            <ul className="ml-menu" style={{
              display: isOpen ? "block" : "none",
              transition: "0.3s linear"
            }}>

              <li className={active === "profile" ? "active" : ""} onClick={() => setactive(active === "profile" ? "" : "profile")}>
                <Link to={`/patientprofile/${localStorage.getItem("loginid")}`}>Profile</Link>
              </li>
              {/* <li className={active === "editprofile" ? "active" : ""} onClick={() => setactive(active === "editprofile" ? "" : "editprofile")}>
                                <Link to={"/editprofile"}>Edit Profile</Link>
                            </li> */}

            </ul>

          </li>
          <li className={active === "doctor" ? "sidebar-menu-item active" : "sidebar-menu-item"} onClick={() => setactive(active === "doctor" ? "" : "doctor")}>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx={9} cy={7} r={4} />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Doctor</span>
              <i className="fa-solid fa-caret-down" onClick={toggledropdown} />


            </a>


          </li>
          {/* <div className="drop-down-div">
                       
                            <li>Profile</li>
                            <li>Edit Profile</li>
                   

                    </div> */}

          <li className={active === "clinics" ? "sidebar-menu-item active" : "sidebar-menu-item"} onClick={() => setactive(active === "clincs" ? "" : "clinics")}>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 2.013H8a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5v-10a5 5 0 0 0-5-5z" />
                <path d="M8 8h8M8 12h8M11 16h2" />
              </svg>
              <span>Clinics</span>
            </a>

          </li>
          <li className={active === "appointments" ? "sidebar-menu-item active" : "sidebar-menu-item"} onClick={() => setactive(active === "appointments" ? "" : "appointments")}>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                <line x1={16} y1={2} x2={16} y2={6} />
                <line x1={8} y1={2} x2={8} y2={6} />
                <line x1={3} y1={10} x2={21} y2={10} />
              </svg>
              <span>Appointments</span>
            </a>
          </li>
          <li className={active === "settings" ? "sidebar-menu-item active" : "sidebar-menu-item"} onClick={() => setactive(active === "settings" ? "" : "settings")}>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={12} cy={12} r={3} />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                </path>
              </svg>
              <span>Settings</span>
            </a>
          </li>
        </div>
        <div className="sidebar-menu logout-link">
          <li className="sidebar-menu-item">
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1={21} y1={12} x2={9} y2={12} />
              </svg>
              <span ><Link to ="/" onClick={handelLogout} >Logout</Link></span>
            </a>
          </li>
        </div>
      </div>
      </div>
    </>
  )
}

export default PatientSidebar