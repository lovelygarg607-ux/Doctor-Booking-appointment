import React, { useState } from 'react'
import "./../styles/createpatientprofile.css"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'
import unknownImage from "./../images/images/user.webp"
import FormData from 'form-data'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux'
import { setpatientProfileData } from '../reducers/Reducers'


const Createpatientprofile = () => {
    const navigate = useNavigate()
    const Dispatch = useDispatch()
    const [loading, setLoading] = useState(false)


    const [formvalue, setFormValue] = useState({
        patientname: "",
        gender: "",
        bloodgroup: "",
        alternateNo: "",
        height: "",
        weight: "",
        alcohol: "",
        smoking: "",
        allergies: "",
        address: "",
        DOB: "",
        familymedicalhistory: "",
        excerciseroutine: "",



    })

    const [profileimage, setProfileimage] = useState(null);
    const [profileimgurl, setProfileimgurl] = useState(null)
    const [insuranceimg, setinsuranceimage] = useState(null);
    const [insuranceimgurl, setinsuranceimgurl] = useState(null)

    const handelprofileimg = (e) => {
        const image1 = e.target.files[0];

        setProfileimage(image1)



        setProfileimgurl(URL.createObjectURL(image1))



    }

    const handelinsuranceimg = (e) => {

        const image2 = e.target.files[0];

        setinsuranceimage(image2)




        setinsuranceimgurl(URL.createObjectURL(image2))

    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormValue(
            {
                ...formvalue,
                [name]: value
            }
        )

    }


    const handleSubmit = async (e) => {
        try {

            e.preventDefault()
            const formdata = new FormData()
            formdata.append("patientname", formvalue.patientname)
            formdata.append("gender", formvalue.gender)
            formdata.append("bloodgroup", formvalue.bloodgroup)
            formdata.append("alternateNo", formvalue.alternateNo)
            formdata.append("height", formvalue.height)
            formdata.append("weight", formvalue.weight)
            formdata.append("smoking", formvalue.smoking)
            formdata.append("alcohol", formvalue.alcohol)
            formdata.append("allergies", formvalue.allergies)
            formdata.append("address", formvalue.address)
            formdata.append("familymedicalhistory", formvalue.familymedicalhistory)
            formdata.append("excerciseroutine", formvalue.excerciseroutine)
            formdata.append("DOB", formvalue.DOB)
            formdata.append("patientImage", profileimage)
            formdata.append("healthinsurance", insuranceimg)

            formdata.append("userID", localStorage.getItem("loginid"))

            if (formvalue.alternateNo.length < 10) {
                Swal.fire({
                    title: "Please enter a 10 digit number",
                    icon: "error",

                });
                setLoading(false)
                return
            }

            if (!profileimgurl) {

                Swal.fire({
                    title: "Please upload a profile Image",
                    icon: "error",

                });
                setLoading(false)
                return
            }




            const profileresponse = await axios.post("/Hospital/patient/addpatient",
                formdata
            )
            if (profileresponse.data.status === "success") {
                setLoading(false)

                Dispatch(setpatientProfileData(profileresponse.data.Patient))

                Swal.fire({
                    title: profileresponse.data.message,
                    icon: "success",
                    draggable: true
                });
                navigate("/patientdashboard")
                setFormValue(
                    {
                        patientname: "",
                        gender: "",
                        bloodgroup: "",
                        alternateNo: "",
                        height: "",
                        weight: "",
                        alcohol: "",
                        smoking: "",
                        allergies: "",
                        address: "",
                        DOB: "",
                        familymedicalhistory: "",
                        excerciseroutine: "",

                    }
                )


                localStorage.setItem("patientid", profileresponse.data.patientid)

                setProfileimage(null)
                setProfileimgurl(null)
                setinsuranceimage(null)
                setinsuranceimgurl(null)





            }
            else {
                setLoading(false)


                Swal.fire({
                    icon: "error",
                    title: profileresponse.data.message,
                    draggable: false
                });
            }

        } catch (error) {
            console.log("error is", error)
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




            <div className="patient-background">
                <div className="overlay" />
                <div className="form-box">
                    <h2>Patient Registration </h2>
                    <p className="doctor-info">
                        🧾 Before accessing your dashboard, please complete your registration as a patient.
                    </p>

                    <div className="patientcontent">
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="patientform-grid">


                                <div className="patientcolumn">
                                    <div className="profile-pic">
                                        <label htmlFor="profileInput">
                                            <img
                                                src={profileimgurl === null ? unknownImage : profileimgurl}
                                                alt="Profile Preview"
                                                id="profilePreview"
                                            />
                                        </label>
                                        <input
                                            type="file"
                                            id="profileInput"
                                            onChange={handelprofileimg}

                                            accept="image/*"
                                        />
                                        <span className="upload-label">Upload Profile</span>
                                    </div>

                                    <div className="patientinput-box">
                                        <span className="patientdetails">Patient Name</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            required
                                            name="patientname"
                                            onChange={handleChange}
                                            value={formvalue.patientname}
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Alternate Number</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your number"
                                            required
                                            name="alternateNo"
                                            maxLength={10}

                                            onChange={handleChange}
                                            value={formvalue.alternateNo}
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Address</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your address"
                                            required
                                            name="address"
                                            onChange={handleChange}
                                            value={formvalue.address}
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Date of Birth</span>
                                        <input
                                            type="date"
                                            placeholder="Enter your address"
                                            required
                                            name="DOB"
                                            onChange={handleChange}
                                            value={formvalue.DOB}
                                        />
                                    </div>


                                </div>


                                <div className="patientcolumn">
                                    <label>Gender</label>
                                    <div className="gender-options">
                                        <label>
                                            <input type="radio" onChange={handleChange} name="gender" value="Male" /> Male
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="gender" value="Female" /> Female
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="gender" value="Prefer not to say" /> Prefer
                                            not to say
                                        </label>
                                    </div>

                                    <div className="patientinput-box" style={{ marginTop: "15px" }}>
                                        <span className="patientdetails">Blood Group</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your bloodgroup"
                                            required
                                            name="bloodgroup"
                                            onChange={handleChange}
                                            value={formvalue.bloodgroup}
                                        />
                                    </div>

                                    <div className="patientinput-box">
                                        <span className="patientdetails">Height</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your height"
                                            required
                                            name="height"
                                            onChange={handleChange}
                                            value={formvalue.height}
                                        />
                                    </div>

                                    <div className="patientinput-box">
                                        <span className="patientdetails">Weight</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your weight"
                                            required
                                            name="weight"
                                            onChange={handleChange}
                                            value={formvalue.weight}
                                        />
                                    </div>
                                    <div className="patientcolumn">
                                        <label>Injuries</label>
                                        <div className="gender-options">
                                            <label>
                                                <input type="radio" onChange={handleChange} name="injuries" value="yes" /> Yes
                                            </label>
                                            <label>
                                                <input type="radio" onChange={handleChange} name="injuries" value="no" /> No
                                            </label>

                                        </div>
                                    </div>
                                    <label>Allergies</label>
                                    <div className="gender-options">
                                        <label>
                                            <input type="radio" onChange={handleChange} name="allergies" value="yes" /> Yes
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="allergies" value="no" /> No
                                        </label>

                                    </div>

                                </div>


                                <div className="patientcolumn">


                                    <label>Alcohol</label>
                                    <div className="gender-options">
                                        <label>
                                            <input type="radio" onChange={handleChange} name="alcohol" value="yes" /> Yes
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="alcohol" value="no" /> No
                                        </label>

                                    </div>
                                    <label>Smoking</label>
                                    <div className="gender-options">
                                        <label>
                                            <input type="radio" onChange={handleChange} name="smoking" value="yes" /> Yes
                                        </label>
                                        <label>
                                            <input type="radio" onChange={handleChange} name="smoking" value="no" /> No
                                        </label>

                                    </div>

                                    <div className="patientinput-box">
                                        <span className="patientdetails">Exercise Routine</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your exercise routine"
                                            required
                                            name="excerciseroutine"
                                            onChange={handleChange}
                                            value={formvalue.excerciseroutine}
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Insurance Document</span>
                                        <label htmlFor="insuranceInput" className="insurance-label">


                                        </label>

                                        {insuranceimgurl && (
                                            <div className="insurance-preview">
                                                <img
                                                    src={insuranceimgurl}
                                                    alt="Insurance Preview"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                            </div>
                                        )}


                                        <input
                                            type="file"
                                            id="insuranceInput"
                                            onChange={handelinsuranceimg}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="patientinput-box">
                                        <span className="patientdetails">Family Medical History</span>
                                        <input
                                            type="text"
                                            placeholder="Enter family medical history"
                                            required
                                            name="familymedicalhistory"
                                            onChange={handleChange}
                                            value={formvalue.familymedicalhistory}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="patientbutton">
                                <input type="submit" value="Register" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>



    )
}


export default Createpatientprofile

