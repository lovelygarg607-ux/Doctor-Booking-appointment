import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./../styles/createdoctorprofile.css"
import unknownImage from "./../images/images/user.webp"
import axios from "axios"
import Swal from "sweetalert2"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Formdata from "form-data"


const Createdoctorprofile = () => {

  const Navigate = useNavigate()
  const [loading, setloading] = useState(false)

  const [profileImage, setProfileimage] = useState(null)
  const [profileimageurl, setProfileurl] = useState(null)
  const [licenceImage, setlicenceImage] = useState(null)
  const [licenceImageurl, setlicenceImageurl] = useState(null)


  const [formvalue, setFormvalue] = useState({

    doctorname: "",
    speciality: "",
    degree: "",
    experience: "",
    gender: "",
    alternateNo: "",
    address: "",
    state: "",
    city: "",
    pincode: "",



  })

  const handlefile = (e) => {
    const { name } = e.target
    if (name === "profileimage") {
      const image = e.target.files[0]
      setProfileimage(image)
      setProfileurl(URL.createObjectURL(image))
    }

    else {
      const image = e.target.files[0]
      setlicenceImage(image)
      setlicenceImageurl(URL.createObjectURL(image))
    }


  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalue(
      {
        ...formvalue,
        [name]: value
      }
    )
  }

  const handleSubmit = async (e) => {

    try {
      e.preventDefault()
      setloading(true)
      const formdata = new Formdata()
      formdata.append("doctorname", formvalue.doctorname)
      formdata.append("experience", formvalue.experience)
      formdata.append("degree", formvalue.degree)
      formdata.append("speciality", formvalue.speciality)
      formdata.append("gender", formvalue.gender)
      formdata.append("alternateNo", formvalue.alternateNo)

      formdata.append("userID", localStorage.getItem("loginid"))
   
      formdata.append("address", formvalue.address)
      formdata.append("state", formvalue.state)
      formdata.append("city", formvalue.city)
      formdata.append("pincode", formvalue.pincode)
      formdata.append("profileImage", profileImage)
      formdata.append("licenseImage", licenceImage)

      if (!profileimageurl) {
        Swal.fire({
          title: "Please upload a profile Image",
          icon: "error",

        });
        setloading(false)
        return
      }


      if (formvalue.alternateNo.length < 10) {
        Swal.fire({
          title: "Please enter a 10 digit number",
          icon: "error",

        });
        setloading(false)
        return
      }


      const profilereponse = await axios.post("https://doctor-booking-appointment-6n0v.onrender.com/Hospital/doctor/adddoctor",
        formdata

      )
             console.log("ADD DOCTOR RESPONSE 👉", profilereponse.data);
      if (profilereponse.data.status === "success") {
      
        Swal.fire({
          title: profilereponse.data.message,
          icon: "success",
          draggable: true
        });
        Navigate("/dashboard")





        setFormvalue(
          {
            doctorname: "",
            speciality: "",
            degree: "",
            experience: "",
            gender: "",
            alternateNo: "",


          }
        )

        setProfileimage(null)
        setProfileurl(null)
        localStorage.setItem("doctorid",profilereponse.data.doctorid)
      }


      else {
        setloading(false)
        Swal.fire({
          icon: "error",
          title: profilereponse.data.message,
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


      <div>

        {/* Background + Form */}
        <div className="medical-background">
          <div className="overlay" />
          <div className="form-box">
            <h2>Doctor Registration </h2>
            <p className="doctor-info">
              🩺 Before accessing your dashboard, please complete your registration  as a doctor .
            </p>
            {/* Profile Upload */}

            <form onSubmit={handleSubmit}>
              <div className="profile-pic">
                <label htmlFor="fileInput">
                  <img src={profileimageurl === null ? unknownImage : profileimageurl} alt="Profile Preview" id="profilePreview" />
                </label>
                <input type="file" id="fileInput" accept="image/*" name="profileimage" onChange={handlefile} />
                <span className="upload-label">Upload Profile Photo</span>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Doctor Name</label>
                  <input type="text" placeholder="Enter your name" required name="doctorname" value={formvalue.doctorname} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Specialization</label>
                  <select
                    required
                    name="speciality"
                    value={formvalue.speciality}
                    onChange={handleChange}
                  >
                    <option value="">Select Specialization</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Pediatrician">Pediatrician (Child Specialist)</option>

                    <option value="Cardiologist">Cardiologist (Heart Specialist)</option>
                    <option value="Neurologist">Neurologist (Brain & Nerves)</option>
                    <option value="Orthopedic">Orthopedic (Bone Specialist)</option>
                    <option value="Dermatologist">Dermatologist (Skin Specialist)</option>
                    <option value="ENT Specialist">ENT Specialist (Ear, Nose, Throat)</option>
                    <option value="Ophthalmologist">Ophthalmologist (Eye Specialist)</option>
                    <option value="Psychiatrist">Psychiatrist (Mental Health)</option>
                    <option value="Oncologist">Oncologist (Cancer Specialist)</option>
                    <option value="General Surgeon">General Surgeon</option>
                    <option value="Dentist">Dentist</option>
                  </select>
                </div>




                <div className="form-group">
                  <label>Alternate Number</label>
                  <input type="text" placeholder="Alternate number" maxLength={10} minLength={10} required name="alternateNo" value={formvalue.alternateNo} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <select
                    required
                    name="degree"
                    value={formvalue.degree}
                    onChange={handleChange}
                  >
                    <option value="">Select Degree</option>

                    <optgroup label="Modern Medicine">
                      <option value="MBBS">MBBS (Bachelor of Medicine, Bachelor of Surgery)</option>
                      <option value="MD">MD (Doctor of Medicine)</option>
                      <option value="MS">MS (Master of Surgery)</option>
                      <option value="DNB">DNB (Diplomate of National Board)</option>
                    </optgroup>

                    <optgroup label="Dental">
                      <option value="BDS">BDS (Bachelor of Dental Surgery)</option>
                      <option value="MDS">MDS (Master of Dental Surgery)</option>
                    </optgroup>

                    <optgroup label="Ayurveda">
                      <option value="BAMS">BAMS (Bachelor of Ayurvedic Medicine & Surgery)</option>
                    </optgroup>

                    <optgroup label="Homeopathy">
                      <option value="BHMS">BHMS (Bachelor of Homeopathic Medicine & Surgery)</option>
                    </optgroup>


                    <optgroup label="Naturopathy & Yoga">
                      <option value="BNYS">BNYS (Bachelor of Naturopathy & Yogic Sciences)</option>
                    </optgroup>
                  </select>
                </div>
                <div className="form-group">
                  <label>Experience</label>
                  <input type="number" placeholder="Years of experience" required name="experience" value={formvalue.experience} onChange={handleChange} />
                </div>


                <div className="form-group">
                  <label>Gender</label>
                  <div className="gender-options" >
                    <label>
                      <input type="radio" name="gender" onChange={handleChange} value="Male" /> Male
                    </label>
                    <label>
                      <input type="radio" name="gender" onChange={handleChange} value="Female" /> Female
                    </label>

                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" placeholder="Address" required name="address" value={formvalue.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" placeholder="city" required name="city" value={formvalue.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" placeholder="state" required name="state" value={formvalue.state} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" placeholder="pincode" required name="pincode" value={formvalue.pincode} onChange={handleChange} />
                </div>
                <div className="patientinput-box">
                  <span className="patientdetails">Insurance Document</span>
                  <label htmlFor="insuranceInput" className="insurance-label">


                  </label>


                  <div className="insurance-preview">
                    <img
                      src={licenceImageurl}
                      alt="Insurance Preview"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>



                  <input
                    type="file"
                    id="insuranceInput"
                    name="licenceimage"
                    accept="image/*"
                    onChange={handlefile}
                  />
                </div>
              </div>
              <button type="submit" className="btn">Create Profile</button>
              <p className="login-text">
                Already a member? <Link to={"/login"}>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>




    </>
  )
}

export default Createdoctorprofile;
