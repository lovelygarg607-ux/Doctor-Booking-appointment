import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./../../styles/dashboard.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { setProfileData } from "./../../reducers/Reducers.js";

const Editprofile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const profileData = useSelector((state) =>  state.doctorprofile);

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [formValue, setFormValue] = useState({
    doctorname: "",
    speciality: "",
    degree: "",
    experience: "",
    gender: "",
    alternateNo: "",
  });


  const [profileImage, setProfileImage] = useState(null)
  const [profileimageUrl, setprofileImageUrl] = useState(null)


  const updateprofileimage = () => {
    if (profileData?.profileImage) {
      setProfileImage(profileData.profileImage)
      setprofileImageUrl(profileData.profileImage)
    }
  }

  const handleImage = async (e) => {
    const image = e.target.files[0]

    if (!image) return
    setProfileImage(image)
    setprofileImageUrl(URL.createObjectURL(image))
  

  try {


    const formdata = new FormData()
    formdata.append("profileImage", image)

    const updatedImage = await axios.patch(`/Hospital/doctor/updateprofiledoctor/${params.id}`, formdata)

    if (updatedImage.data.status === "success") {
      dispatch(setProfileData(updatedImage.data.updatedoctor))
      setprofileImageUrl(updatedImage.data.updatedoctor)

      Swal.fire({
        title: updatedImage.data.message,
        icon: "success",
        draggable: true
      });

    }


    else {

      Swal.fire({
        icon: "error",
        title: updatedImage.data.message,
        draggable: false
      });

    }
  } catch (error) {

    console.log(`error is${error}`)
  }
}


  const updatedformvalue = () => {
    setFormValue({
      ...formValue,
      doctorname: profileData?.doctorname,
      speciality: profileData?.speciality,
      degree: profileData?.degree,
      experience: profileData?.experience,
      gender: profileData?.gender,
      alternateNo: profileData?.alternateNo
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };



    const handelSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const updatedresponse = await axios.patch(`/Hospital/doctor/updatedoctor/${params.id}`,
        formValue,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

          }
        }
      )

      if (updatedresponse.data.status === "success") {
        dispatch(setProfileData(updatedresponse.data.updatedoctor))
        setLoading(false)
        Swal.fire({
          title: updatedresponse.data.message,
          icon: "success",
          draggable: true
        });

      }
      else {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: updatedresponse.data.message,
          draggable: false
        });

      }



    } catch (error) {
      console.log(`error is ${error}`)

    }
  }








  useEffect(() => {
    updatedformvalue();
    updateprofileimage();
  }, [profileData]);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

         <div className="main-dashboard">
        <Sidebar />
        <main className="main-content">

          <div className="profile-container">

            <div className="profile-header" />
            <div className="avatar-wrapper">
              {profileData?.profileImage ? (<img src={profileimageUrl} alt="Admin Photo" />) : <img src="https://i.pravatar.cc/150?u=admin" alt="Admin Photo" />}
            </div>

            <div className="profile-info">
              <div className="names">
                <h1>Dr. {profileData?.doctorname}</h1>
                <p>{profileData?.userID?.email}</p>
              </div>
              <div className="profile-actions">
                <label htmlFor="fileInput" className="btn-outline" style={{ cursor: "pointer", marginTop:"3px", fontSize:"20px" }}>
                  +
                </label>
                <input
                  id="fileInput"
                  type="file"

                  style={{ display: "none" }}
                  onChange={handleImage}
                />
                <button className="btn-outline">⚙️</button>
                <button className="btn-outline">Share</button>
              </div>
            </div>
            <div className="profile-tabs">
              <div className="tab">Details</div>
              <div className="tab">Security</div>
              <div className="tab">Payment</div>
              <div className="tab">API</div>
              <div className="tab active">Profile</div>
            </div>
            <form action="" onSubmit={handelSubmit}>
              <div className="profile-content">
                <div className="combine-input">
                  <div className="field">
                    <label htmlFor="current">Doctor Name</label>
                    <input id="current" type="text" placeholder="Enter your name" name="doctorname" onChange={handleChange} value={formValue.doctorname} />
                  </div>
                  <div className="field">
                    <label htmlFor="current">Speciality</label>
                    <input id="current" type="text" placeholder="Enter speciality" name="speciality" onChange={handleChange} value={formValue.speciality} />
                  </div>
                </div>
                <div className="combine-input">
                  <div className="field">
                    <label htmlFor="current">Experience</label>
                    <input id="current" type="text" placeholder="Enter experience" name="experience" onChange={handleChange} value={formValue.experience} />
                  </div>
                  <div className="field">
                    <label htmlFor="current">Degree</label>
                    <input id="current" type="text" placeholder="Enter degree" name='degree' onChange={handleChange} value={formValue.degree} />
                  </div>
                </div>
                <div className="combine-input">
                  <div className="field">
                    <label htmlFor="current"> Email</label>
                    <input id="current" type="text" placeholder="Enter email" value={profileData?.userID?.email} />
                  </div>
                  <div className="field">
                    <label htmlFor="current"> Gender</label>
                    <input id="current" type="text" placeholder="Enter gender" name="gender" onChange={handleChange} value={formValue.gender} />
                  </div>

                </div>
                <div className="combine-input">
                  <div className="field">
                    <label htmlFor="current">Phone Number</label>
                    <input id="current" type="text" placeholder="Enter phone number" value={profileData?.userID.mobileno} />
                  </div>
                  <div className="field">
                    <label htmlFor="current">Alternate No</label>
                    <input id="current" type="text" placeholder="Enter alternate no." name='alternateNo' value={formValue.alternateNo} onChange={handleChange} />
                  </div>
                </div>





                <div className="actions-row">

                  <button type='submit' className="btn-outlines">Update Profile</button>
                </div>
              </div>
            </form>

          </div>



        </main>
      </div>

    </>
  );
};

export default Editprofile;

