import React, { useEffect, useState } from "react";
import "../../styles/clinicprofile.css"
import Clinicsidebar from "./Clinicsidebar";
import Clinicheader from "./Clinicheader";
import { useDispatch, useSelector } from "react-redux";
import { setClinicProfileData } from "../../reducers/Reducers";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Clinicprofile = () => {
  const clinicprofileData = useSelector((state) => state.clinicprofile);
  const dispatch = useDispatch();
  const params = useParams();

  const [formvalue, setformValue] = useState({
    clinicname: "",
    address: "",
    email: "",
    contact: "",
    openingtime: "",
    closingtime: "",
    totalDoctors: "",

  })


  const updateformvalues = () => {
    setformValue({
      clinicname: clinicprofileData?.clinicname,
      address: clinicprofileData?.address,
      email: clinicprofileData?.email,
      contact: clinicprofileData?.contact,
      openingtime: clinicprofileData?.openingtime,
      closingtime: clinicprofileData?.closingtime,
      totalDoctors: clinicprofileData?.totalDoctors,




    })
  }
    


    const handleChange = (e) => {
      const { name, value } = e.target;
      setformValue({
        ...formvalue,
        [name]: value
      });
    };


    const handleSubmit = async (e) => {
      e.preventDefault()
      try {

        const updatedclinicresponse = await axios.patch(`https://doctor-booking-appointment-6n0v.onrender.com/Hospital/clinic/updateclinic/${params.id}`,
          formvalue,
          {
            headers: { "Content-Type": "application/json" },
          }
        )


        if (updatedclinicresponse.data.status === "success") {
          dispatch(setClinicProfileData(updatedclinicresponse.data.updateclinic))
          setformValue(updatedclinicresponse.data.updateclinic)

          Swal.fire({
            title: updatedclinicresponse.data.message,
            icon: "success",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: updatedclinicresponse.data.message,
          });
        }


      } catch (error) {


        console.log("error is",error)
      }
    }

  

  useEffect(()=>{
    updateformvalues();
  },[clinicprofileData])

  return (
    <>
      <div className="main-dashboard">
        <Clinicsidebar />
        <main className="main-content">
          <Clinicheader />

          <div className="clinic-main-container">
            <div className="patient-main-content">
              <h2 className="profile-update-heading">Clinic Profile</h2>

              {/* ---------------- FORM START ---------------- */}
              <form  onSubmit={handleSubmit}>
                <div className="top-section-container">
                  {/* -------- LEFT: IMAGES -------- */}
                  <div className="clinic-photo-section">
                    <img
                      src={clinicprofileData?.clinicImages[0]}
                      alt="Clinic"
                      className="clinic-photo-large"
                    />

                    <div className="clinic-photo-row">
                      <img
                        src={clinicprofileData?.clinicImages[1]}
                        className="clinic-photo-small"
                        alt="Clinic 1"
                      />
                      <img
                        src={clinicprofileData?.clinicImages[2]}
                        className="clinic-photo-small"
                        alt="Clinic 2"
                      />
                      <img
                        src={clinicprofileData?.clinicImages[3]}
                        className="clinic-photo-small"
                        alt="Clinic 3"
                      />
                    </div>
                  </div>

                  {/* -------- RIGHT: BASIC DETAILS -------- */}
                  <div className="clinic-basic-details">
                    <div className="patient-field">
                      <label>Clinic Name</label>
                      <input
                        type="text"
                        name="clinicname"
                        value={formvalue.clinicname}
                         onChange={handleChange}
                        placeholder="Enter clinic name"
                      />
                    </div>

                    <div className="patient-field">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formvalue.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                      />
                    </div>

                    <div className="patient-field">
                      <label>Contact</label>
                      <input
                        type="text"
                        name="contact"
                        value={formvalue.contact}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                      />
                    </div>

                    <div className="patient-field">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formvalue.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                      />
                    </div>
                    <div className="patient-column">
                      <div className="patient-field">
                        <label>Opening Time</label>
                        <input
                          type="text"
                          name="openingtime"
                          value={formvalue.openingtime}
                          onChange={handleChange}
                          placeholder="Enter opening time"
                        />
                      </div>
                      <div className="patient-column">
                        <div className="patient-field">
                          <label>Closing Time</label>
                          <input
                            type="text"
                            name="closingtime"
                            value={formvalue.closingtime}
                            onChange={handleChange}
                            placeholder="Enter closing time"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="patient-field">
                      <label>Total Doctors</label>
                      <input
                        type="text"
                        name="totalDoctors"
                        value={formvalue.totalDoctors}
                        onChange={handleChange}
                        placeholder="Enter no. of doctors"
                      />
                    </div>

                  </div>
                </div>
                <div className="actions-row">
                  <button type="submit" className="patient-submit-btn">
                    Update Profile
                  </button>
                </div>

                {/* ----------- LOWER DETAILS ----------- */}




              </form>

            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Clinicprofile;
