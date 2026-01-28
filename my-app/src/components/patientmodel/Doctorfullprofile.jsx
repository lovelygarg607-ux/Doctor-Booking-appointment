import React, { useState } from 'react'


import "../../styles/Doctorfullprofile.css"
import PatientHeader from "./PatientHeader"
import PatientSidebar from "./PatientSidebar"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import Swal from "sweetalert2";
import { useEffect } from 'react'


const Doctorfullprofile = () => {

    const params = useParams();
    const [doctordata, setDoctordata] = useState(null)
    const [selectedClinicId, setSelectedClinicId] = useState(null);





    const [showpopup, setshowpopup] = useState(false)
    const [selecteddoctor, setselecteddoctor] = useState(null)
    const patientprofileData = useSelector((state) => state.patientprofile)
    console.log(patientprofileData)


    const [formvalue, setformValue] = useState({
        bookingDate: "",
        bookingTime: "",

    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValue({
            ...formvalue,
            [name]: value
        })
    }


    const handlepopup = (doctor, clinicId) => {
        setshowpopup(true)
        setselecteddoctor(doctor)
        setSelectedClinicId(clinicId);
    }


    const getDoctorProfilebydoctorid = async () => {
        try {

            const getdoctorresponse = await axios.get(`https://doctor-booking-appointment-6n0v.onrender.com/Hospital/patient/viewProfileBydoctorid/${params.id}`)
            if (getdoctorresponse.data.status === "success") {
                setDoctordata(getdoctorresponse.data.existingdoctor)

            }


            else {
                console.log("no doctor found")
            }

        } catch (error) {

            console.log("error in fetch doctorprofilebyid", error)

        }
    }

    useEffect(() => {
        getDoctorProfilebydoctorid()
    }, [params.id])


    const bookingappointment = async (e) => {
        try {
            e.preventDefault()


            const bookingappointmentresponse = await axios.post("https://doctor-booking-appointment-6n0v.onrender.com/Hospital/appointment/bookappointment",
                {
                    bookingDate: formvalue.bookingDate,
                    bookingTime: formvalue.bookingTime,
                    DoctorId: doctordata._id,
                    PatientId: patientprofileData._id,
                    ClinicId: selectedClinicId,
                },


                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (bookingappointmentresponse.data.status === "success") {
                Swal.fire({
                    title: bookingappointmentresponse.data.message,
                    icon: "success",
                    draggable: true
                });

                setshowpopup(false)

                setformValue({ bookingDate: "", bookingTime: "" });

            }


            else {
                setshowpopup(true)
            }
        } catch (error) {
            console.log("Booking error", error);
            Swal.fire("Error", "Booking failed", "error");
        }
    }





    return (
        <>

            <div className="main-dashboard">
                <PatientSidebar />
                <div className="main-content">
                    <PatientHeader />

                    <div className="doctor-profile-page">
                        <div className="profile-card">
                            <div className="profile-left">
                                {<img src={doctordata?.profileImage} alt="Doctor" />}

                            </div>

                            <div className="profile-middle">
                                <h2>Dr {doctordata?.doctorname}</h2>
                                <p className="specialty">
                                    {doctordata?.speciality} <span>• {doctordata?.degree}</span>
                                </p>

                                <div className="info">
                                    <p><i className="fa-solid fa-envelope" /> {doctordata?.userID.email}</p>
                                    <p><i className="fa-solid fa-phone" /> {doctordata?.userID.mobileno}</p>
                                    <p><i className="fa-solid fa-graduation-cap" /> {doctordata?.degree}</p>
                                    <p><i className="fa-solid fa-indian-rupee-sign" /> 500</p>
                                    <p><i className="fa-solid fa-location-dot" /> {doctordata?.address},{doctordata?.city},{doctordata?.state}</p>
              
                                </div>


                            </div>

                            <div className="profile-right">
                                <p><strong>Availability</strong><br />21:30 - 22:30</p>
                                <p><i className="fa-solid fa-cake-candles" /> 22</p>
                                <p><i className="fa-solid fa-venus" /> {doctordata?.gender}</p>
                                <p><i className="fa-solid fa-id-card" /> 23456</p>
                            </div>
                        </div>

                        {/* Biography */}
                        <div className="section-card">
                            <h3>Biography</h3>
                            <p>I am specialized in providing health care with compassion and excellence.</p>
                        </div>

                        {/* Clinics */}
                        <div className="section-card">
                            <h3>Available for Appointments At</h3>

                            <div className="clinic-list-with-map">

                                {/* CLINIC LIST */}
                                <div className="clinic-list">
                                    {doctordata?.clinics?.map((clinic) => (
                                        <div className="clinic-card" key={clinic._id}>
                                            <img
                                                src={clinic?.clinicImages?.[0] || "/default-clinic.png"}
                                                alt="Clinic"
                                            />


                                            <div className="clinic-info">
                                                <h4>{clinic.clinicname}</h4>
                                                <p>
                                                    <i className="fa-solid fa-location-dot" /> {clinic.address}
                                                </p>
                                                <p>
                                                    <i className="fa-solid fa-clock" /> {clinic.openingtime}
                                                </p>

                                                <button
                                                    className="book-btn small"
                                                    onClick={() => handlepopup(doctordata, clinic._id)}
                                                >
                                                    Book Appointment
                                                </button>


                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* MAP */}


                            </div>
                        </div>

                    </div>




                    {showpopup && (
                        <div className="appointment-overlay">
                            <div className="appointment-popup">
                                <h3>Book Appointment</h3>
                                <p><strong>Doctor:</strong> Dr {selecteddoctor?.doctorname}</p>

                                <form onSubmit={bookingappointment}>
                                    <div className="appointment-field">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            name="bookingDate"
                                            value={formvalue.bookingDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="appointment-field">
                                        <label>Time</label>
                                        <input
                                            type="time"
                                            name="bookingTime"
                                            value={formvalue.bookingTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="popup-actions">
                                        <button type="submit" className="confirm-btn">
                                            Confirm
                                        </button>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => setshowpopup(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}


                </div>
            </div>

        </>
    )
}



export default Doctorfullprofile;
