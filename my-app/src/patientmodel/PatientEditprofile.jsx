
import React, { useEffect, useState } from 'react'

import PatientSidebar from "./PatientSidebar.jsx"
import user from "./../images/images/user.webp"
import "./../styles/createpatientprofile.css"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setpatientProfileData } from '../reducers/Reducers.js'
import Swal from "sweetalert2"
import { useParams } from 'react-router-dom'
import FormData from 'form-data'

const PatientEditprofile = () => {

  const Dispatch = useDispatch()
  const params = useParams()
  const PatientprofileData = useSelector((state) => state.patientprofile)

  const [formValue, setFormvalue] = useState({
    patientname: "",
    gender: "",
    DOB: "",
    bloodgroup: "",
    height: "",
    weight: "",
    injuries: "",
    familymedicalhistory: "",
    exerciseroutine: "",
    alcohol: "",
    smoking: "",
    allergies: "",
    address: "",
    alternateNo: ""
  })

  const [profileImage, setProfileImage] = useState(PatientprofileData?.patientImage)
  const [profileImageurl, setprofileImageurl] = useState(PatientprofileData?.patientImage)


  const [insuranceImage, setInsuranceImage] = useState(PatientprofileData?.healthinsurance)
  const [insuranceImageurl, setInsuranceImageurl] = useState(PatientprofileData?.healthinsurance)


  const updateformvalues = () => {
    setFormvalue({
      ...formValue,
      patientname: PatientprofileData?.patientname,
      gender: PatientprofileData?.gender,
      DOB: PatientprofileData?.DOB,
      bloodgroup: PatientprofileData?.bloodgroup,
      height: PatientprofileData?.height,
      weight: PatientprofileData?.weight,
      injuries: PatientprofileData?.injuries,
      familymedicalhistory: PatientprofileData?.familymedicalhistory,
      exerciseroutine: PatientprofileData?.exerciseroutine,
      alcohol: PatientprofileData?.alcohol,
      smoking: PatientprofileData?.smoking,
      allergies: PatientprofileData?.allergies,
      address: PatientprofileData?.address,
      alternateNo: PatientprofileData?.alternateNo

    })

    setprofileImageurl(PatientprofileData?.patientImage)
    setInsuranceImageurl(PatientprofileData?.healthinsurance)
  }


  const handelChnage = (e) => {
    const { name, value } = e.target;

    setFormvalue(
      {
        ...formValue,
        [name]: value
      }
    )

  }


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const updatedpatientresponse = await axios.patch(`/Hospital/patient/updatepatient/${params.id}`,
        formValue,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (updatedpatientresponse.data.status === "success") {
        Dispatch(setpatientProfileData(updatedpatientresponse.data.updatepatient))
        setFormvalue(updatedpatientresponse.data.updatepatient)
        Swal.fire({
          title: updatedpatientresponse.data.message,
          icon: "success",
          draggable: true
        });
      }
      else {

        Swal.fire({
          icon: "error",
          title: updatedpatientresponse.data.message,
          draggable: false
        });
      }

    } catch (error) {
      console.log("error is", error)
    }
  }

  const handleProfileImage = async (e) => {
    const profileimage = e.target.files[0]
    if (!profileimage) return;
    setProfileImage(profileimage)
    setprofileImageurl(URL.createObjectURL(profileimage))

    try {
      const formdata = new FormData()
      formdata.append("patientImage", profileimage)

      const updatedprofileimgresponse = await axios.patch(`/Hospital/patient/updatepatientimage/${params.id}`,
        formdata
      )

      if (updatedprofileimgresponse.data.status === "success") {
        Dispatch(setpatientProfileData(updatedprofileimgresponse.data.getpatient))
        setProfileImage(updatedprofileimgresponse.data.getpatient.patientImage)
        setprofileImageurl(updatedprofileimgresponse.data.getpatient.patientImage)


        Swal.fire({
          title: updatedprofileimgresponse.data.message,
          icon: "success",
          draggable: true
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: updatedprofileimgresponse.data.message,
          draggable: false
        });
      }


    } catch (error) {
      console.log("error is", error)
    }
  }

  const handleinsuranceImage = async (e) => {
    const insuranceimage = e.target.files[0]
    if (!insuranceimage) return;
    setInsuranceImage(insuranceimage)
    setInsuranceImageurl(URL.createObjectURL(insuranceimage))

    try {
      const formdata = new FormData()
      formdata.append("healthinsurance", insuranceimage)

      const updatedinsuranceimgresponse = await axios.patch(`/Hospital/patient/updatehealthinsuranceimage/${params.id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (updatedinsuranceimgresponse.data.status === "success") {
        Dispatch(setpatientProfileData(updatedinsuranceimgresponse.data.getinsuranceimage))
        setInsuranceImage(updatedinsuranceimgresponse.data.getinsuranceimage.healthinsurance)
        setInsuranceImageurl(updatedinsuranceimgresponse.data.getinsuranceimage.healthinsurance)


        Swal.fire({
          title: updatedinsuranceimgresponse.data.message,
          icon: "success",
          draggable: true
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: updatedinsuranceimgresponse.data.message,
          draggable: false
        });
      }


    } catch (error) {
      console.log("error is", error)
    }
  }

  useEffect(() => {
    updateformvalues()

  }, [PatientprofileData])

  return (
    <>
      <div className="main-dashboard" style={{ marginTop: "-25px" }}>
        <PatientSidebar />
        <main className="main-content">

          <div className="patient-main-container">
            <main className="patient-main-content">
              <div className="patient-profile-container">

                {/* Profile image */}
                <div className="patient-avatar-section">
                  <img src={profileImageurl === null ? user : profileImageurl} alt="Profile" />
                  <label htmlFor="profileInput" className="upload-btn">+</label>
                  <input id="profileInput" type="file" accept="image/*" onChange={handleProfileImage} />
                </div>
                <div className="names">
                  <h1> {PatientprofileData?.patientname}</h1>
                  <p>{PatientprofileData?.userID?.email}</p>
                </div>
                {/* 
                 <h2 className="patient-title">Patient Profile</h2>
              <p className="patient-subtitle">Manage and update your information</p>  */}

                <form className="patient-form" onSubmit={handleSubmit}>
                  <div className="patient-grid">

                    {/* Column 1 */}
                    <div className="patient-column">
                      <div className="patient-field">
                        <label>Patient Name</label>
                        <input type="text" placeholder="Enter your full name" name='patientname' onChange={handelChnage} value={formValue.patientname} />
                      </div>
                      <div className="patient-field">
                        <label>mobile No</label>
                        <input type="text" placeholder="Enter your mobileno" name='mobileno' onChange={handelChnage} value={PatientprofileData?.userID?.mobileno} />
                      </div>
                      <div className="patient-field">
                        <label>Alternate No</label>
                        <input type="text" placeholder="Enter your alternate no" name='alternateNo' onChange={handelChnage} value={formValue.alternateNo} />
                      </div>
                      <div className="patient-field">
                        <label>Address</label>
                        <input type="text" placeholder="Enter your  address" name='address' onChange={handelChnage} value={formValue.address} />
                      </div>
                      <div className="patient-field">
                        <label>Date of Birth</label>
                        <input type="text" placeholder="Enter your date of birth" name='DOB' onChange={handelChnage} value={formValue.DOB} />
                      </div>
                      <div className="patient-field">
                        <label>Gender</label>
                        <input type="text" placeholder="Enter your gender" name='gender' onChange={handelChnage} value={formValue.gender} />
                      </div>

                      <div className="patient-field">
                        <label>Blood Group</label>
                        <input type="text" placeholder="Enter your age" name='bloodgroup' onChange={handelChnage} value={formValue.bloodgroup} />
                      </div>
                      <div className="patient-field">
                        <label>Exercise Routine</label>
                        <input type="text" placeholder="Enter your age" name='exerciseroutine' onChange={handelChnage} value={formValue.exerciseroutine} />
                      </div>
                      <div className="patientinput-box">
                        <span className="patientdetails">Insurance Document</span>
                        <label htmlFor="insuranceInput" className="insurance-label">


                        </label>


                        <div className="insurance-preview">
                          <img
                            src={insuranceImageurl === null ? user : insuranceImageurl}
                            alt="Insurance Preview"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                          />
                        </div>



                        <input
                          type="file"
                          id="insuranceInput"

                          accept="image/*"
                          onChange={handleinsuranceImage}
                        />


                      </div>

                    </div>

                    {/* Column 2 */}
                    <div className="patient-column">
                      <div className="patient-field">
                        <label>Height</label>
                        <input type="text" placeholder="Enter height" name='height' onChange={handelChnage} value={formValue.height} />
                      </div>
                      <div className="patient-field">
                        <label>Weight</label>
                        <input type="text" placeholder="Enter weight" name='weight' onChange={handelChnage} value={formValue.weight} />
                      </div>

                      <div className="patient-field">
                        <label>Alcohol </label>
                        <input type="text" placeholder="Enter alcohol" name='alcohol' onChange={handelChnage} value={formValue.alcohol} />
                      </div>

                      <div className="patient-field">
                        <label>Smoking</label>
                        <input type="text" placeholder="Enter smoking" name='smoking' onChange={handelChnage} value={formValue.smoking} />
                      </div>
                      <div className="patient-field">
                        <label>Allergies</label>
                        <input type="text" placeholder="Enter weight" name='allergies' onChange={handelChnage} value={formValue.allergies} />
                      </div>
                      <div className="patient-field">
                        <label>Injuries</label>
                        <input type="text" placeholder="Enter weight" name='injuries' onChange={handelChnage} value={formValue.injuries} />
                      </div>
                      <div className="patient-field">
                        <label>Family medical history</label>
                        <input type="text" placeholder="Enter family medical history" name='familymedicalhistory' onChange={handelChnage} value={formValue.familymedicalhistory} />
                      </div>



                    </div>



                  </div>


                  <div className="actions-row">
                    <button type="submit" className="patient-submit-btn">Update Profile</button>
                  </div>
                </form>
              </div>
            </main>
          </div>



        </main>
      </div></>
  )
}

export default PatientEditprofile