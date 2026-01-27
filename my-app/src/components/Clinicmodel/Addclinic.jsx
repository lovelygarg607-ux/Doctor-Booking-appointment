import React, { useState } from 'react'
import "./../../styles/addclinic.css"
import Formdata from "form-data"
import axios from 'axios'
import Swal from "sweetalert2";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';



const Addclinic = () => {


    const Navigate = useNavigate()
    const [loading, setloading] = useState(false)

    const [Formvalue, setFormvalue] = useState({
        clinicname: "",
        address: "",
        contact: "",
        email: "",
        openingtime: "",
        closingtime: "",
        totalDoctors: "",

        userID: ""
    }
    )

    const [clinicImages,setclinicImages]=useState([])
    const[clinicImagesurl,setclinicImagesurl]=useState([])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormvalue({
            ...Formvalue,
            [name]: value

        })
    }


    const handleclinicImages=(e)=>{
        const files=Array.from(e.target.files).slice(0,4)
        setclinicImages(files)

        const clinicimagesurl=files.map(file =>URL.createObjectURL(file))
        setclinicImagesurl(clinicimagesurl)
    }


    const handleSubmit = async (e) => {
        try {

            e.preventDefault()
            setloading(true)
            const formdata = new Formdata()
            formdata.append("clinicname", Formvalue.clinicname)
            formdata.append("address", Formvalue.address)
            formdata.append("contact", Formvalue.contact)
            formdata.append("email", Formvalue.email)
            formdata.append("openingtime", Formvalue.openingtime)
            formdata.append("closingtime", Formvalue.closingtime)
            formdata.append("totalDoctors", Formvalue.totalDoctors)

            formdata.append("userID", localStorage.getItem("loginid"))
            clinicImages.forEach(file =>{
                formdata.append("clinicImages",file)
            })

            if (Formvalue.contact.length < 10) {
                Swal.fire({
                    title: "Please enter a 10 digit number",
                    icon: "error",

                });
                setloading(false)
                return
            }


            const clinicreponse = await axios.post("https://doctor-booking-appointment-6n0v.onrender.com/Hospital/clinic/addclinic", formdata)
            if (clinicreponse.data.status === "success") {
                setloading(false)
                Swal.fire({
                    title: clinicreponse.data.message,
                    icon: "success",
                    draggable: true
                });

                Navigate("/clinicdashboard")
                setFormvalue(
                    {


                        clinicname: "",
                        address: "",
                        contact: "",
                        email: "",
                        openingtime: "",
                        closingtime: "",
                        totalDoctors: "",

                        userID: ""
                    }
                )

                setclinicImages(null)
                setclinicImagesurl(null)

                localStorage.setItem("clinicid",clinicreponse.data.clinicid)

            }


            else{
              
                setloading(false)
                  Swal.fire({
                    icon: "error",
                    title: clinicreponse.data.message,
                    draggable: false
                });
                
            }



        } catch (error) {
            console.log("error is" ,error)
            setloading(false)

        }
    }










    return (
        <>
         <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="clinic-background">
                <div className="overlay" />
                <div className="form-box">
                    <h2>Clinic Registration</h2>
                    <p className="doctor-info">
                        🏥 Please register your clinic details to appear on the platform.
                    </p>
                    <div className="patientcontent">
                        <form onSubmit={handleSubmit}>
                            <div className="patientform-grid">
                                {/* Column 1 */}
                                <div className="patientcolumn">
                                    <div className="profile-pic">
                                        <label htmlFor="clinicImages">
                                            <div className="clinic-preview-box">
                                                 {clinicImagesurl?.length > 0 ? (
                                                    clinicImagesurl.map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={img}
                                                            alt="Clinic Preview"
                                                            style={{
                                                                width: "80px",
                                                                height: "80px",
                                                                objectFit: "cover",
                                                                marginRight: "8px",
                                                                borderRadius: "8px"
                                                            }}
                                                        />
                                                    ))
                                                ) : (
                                                    <p>Upload Clinic Images</p>
                                                )}
                                                    

                                               


                                            </div>
                                        </label>

                                        <input
                                            type="file"
                                            id="clinicImages"
                                            multiple
                                            accept="image/*"
                                            onChange={handleclinicImages}

                                        />

                                        <span className="upload-label">Upload Clinic Images (Max 4)</span>
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Clinic Name</span>
                                        <input type="text" placeholder="Enter clinic name" required name='clinicname' onChange={handleChange} value={Formvalue.clinicname} />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Contact Number</span>
                                        <input type="text" placeholder="Enter contact number" maxLength={10} minLength={10} required name='contact' onChange={handleChange} value={Formvalue.contact}/>
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Email</span>
                                        <input type="email" placeholder="Enter clinic email" name='email' required onChange={handleChange} value={Formvalue.email} />
                                    </div>


                                </div>
                                {/* Column 2 */}

                                {/* Column 3 */}
                                <div className="patientcolumn">
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Address</span>
                                        <input type="text" placeholder="Enter clinic email" name='address' onChange={handleChange} value={Formvalue.address} required />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Opening Time</span>
                                        <input type="time" required name='openingtime' onChange={handleChange} value={Formvalue.openingtime} />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Closing Time</span>
                                        <input type="time" required name='closingtime'  onChange={handleChange} value={Formvalue.closingtime}/>
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Total Doctors</span>
                                        <input type="text" placeholder="e.g. Dental, General Physician" required name='totalDoctors' onChange={handleChange}  value={Formvalue.totalDoctors}/>
                                    </div>



                                </div>
                                {/* <div className="patientcolumn">
                                      <div className="patientinput-box">
                                        <span className="patientdetails">Services Offered</span>
                                        <input type="text" placeholder="e.g. Dental, General Physician" required name='services' onChange={handleChange} value={formvalue.services} />
                                    </div>
                                        <div className="patientinput-box">
                                        <span className="patientdetails">Insurance Document</span>
                                        <label htmlFor="insuranceInput" className="insurance-label">


                                        </label>

                                      



                                        <input
                                            type="file"
                                            id="insuranceInput"
                                            onChange={handlelicencefile}
                                            accept="image/*"
                                        />
                                    </div>
                                 </div> */}
                            </div>
                            <div className="patientbutton">
                                <input type="submit" defaultValue="Register Clinic" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Addclinic
