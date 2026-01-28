import React, { useEffect, useState } from "react";
import "../../styles/Appoinmentlist.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import { Pagination } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

const Appoinmentlist = () => {
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [totalappointments, setTotalappointment] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    const calculateAge = (dob) =>
        dob ? Math.floor((Date.now() - new Date(dob)) / 31557600000) : "-";

    const getappoinmnetlist = async () => {
        try {
            setLoading(true);
            const doctorId = localStorage.getItem("doctorId");
            console.log("DoctorId from storage:", doctorId);
          const query = `https://doctor-booking-appointment-6n0v.onrender.com/Hospital/appointment/appointmentlist?doctorId=${doctorId}&page=${currentPage}&limit=${limit}`;
            const res = await axios.get(query);

            if (res.data.status === "success") {
                setAppointments(res.data.appointments);
                setTotalappointment(res.data.totalrecords);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateAppointmentStatus = async (item, status) => {
        try {
            setLoading(true);

            let response;

            if (status === "approved") {
                response = await axios.patch(
                    "https://doctor-booking-appointment-6n0v.onrender.com/Hospital/appointment/approvedappointment",
                    { appointmentId: item._id }
                );
            }

            if (status === "cancelled") {
                response = await axios.patch(
                    "https://doctor-booking-appointment-6n0v.onrender.com/Hospital/appointment/cancelappointment",
                    {
                        PatientId: item.PatientId?._id,
                        DoctorId: item.DoctorId?._id,
                        ClinicId: item.ClinicId?._id,
                        bookingDate: item.bookingDate,
                        bookingTime: item.bookingTime,
                    }
                );
            }

            if (status === "completed") {
                response = await axios.patch(
                    "https://doctor-booking-appointment-6n0v.onrender.com/Hospital/appointment/completeappointment",
                    {
                        PatientId: item.PatientId?._id,
                        DoctorId: item.DoctorId?._id,
                        ClinicId: item.ClinicId?._id,
                        bookingDate: item.bookingDate,
                        bookingTime: item.bookingTime,
                    }
                );
            }

            if (response?.data?.status === "success") {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                });

                setAppointments((prev) =>
                    prev.map((appt) =>
                        appt._id === item._id
                            ? { ...appt, bookingStatus: status }
                            : appt
                    )
                );
            } else {
                Swal.fire({
                    icon: "error",
                    title: response.data.message || "Action failed",
                });
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Server Error",
                text: "Something went wrong",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };


    // const confirmappointment = async (appointmentId) => {
    //     try {
    //         setLoading(true);

    //         const response = await axios.patch(
    //             "/Hospital/appointment/approvedappointment",
    //             { appointmentId }
    //         );

    //         if (response.data.status === "success") {
    //             Swal.fire({
    //                 title: response.data.message,
    //                 icon: "success",
    //                 draggable: true
    //             });

    //             setAppointments((prev) =>
    //                 prev.map((item) =>
    //                     item._id === appointmentId
    //                         ? { ...item, bookingStatus: "approved" }
    //                         : item
    //                 )
    //             );
    //         } else {
    //             Swal.fire({
    //                      icon: "error",
    //                      title: response.data.message,

    //                    });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         Swal.fire({
    //             title: "Server Error",
    //             text: "Something went wrong",
    //             icon: "error",
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

     useEffect(() => {
        getappoinmnetlist();
     }, [currentPage]);

    return (
        <>
            <Backdrop open={loading} sx={{ zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="main-dashboard">
                <Sidebar />

                <main className="main-content">
                    <Header />

                    <div className="container">
                        <h2 className="page-title">Today's Appointments</h2>

                        <div className="appointment-table">
                            <div className="table-row table-head">
                                <div>Patient</div>
                                <div>Age</div>
                                <div>Date</div>
                                <div>Time</div>
                                <div>Status</div>
                                <div>Update</div>
                            </div>

                            {appointments.length > 0 ? (
                                appointments.map((item) => (
                                    <div className="table-row" key={item._id}>
                                        <div className="patient">
                                            <img
                                                src={item.PatientId?.patientImage}
                                                alt="patient"
                                            />
                                            <span>{item.PatientId?.patientname}</span>
                                        </div>

                                        <div>{calculateAge(item.PatientId?.DOB)}</div>

                                        <div>
                                            {new Date(item.bookingDate).toLocaleDateString()}
                                        </div>

                                        <div>{item.bookingTime}</div>

                                        <div>
                                            <span>{item.bookingStatus}</span>
                                        </div>

                                        <div>
                                            <select
                                                className="status-select"
                                                value={item.bookingStatus}
                                                onChange={(e) =>
                                                    updateAppointmentStatus(item, e.target.value)
                                                }
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>

                                            {/* <select
                                                className="status-select"
                                                value={item.bookingStatus}
                                                onChange={(e) =>
                                                    e.target.value === "approved" &&
                                                    confirmappointment(item._id)
                                                }
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select> */}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-data">No patient found</p>
                            )}

                            <div className="pagination">
                                <Pagination
                                    current={currentPage}
                                    pageSize={limit}
                                    total={totalappointments}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Appoinmentlist;


