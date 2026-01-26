import React, { useState } from 'react'
import "./../styles/form.css"

import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';

import CircularProgress from '@mui/material/CircularProgress';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import loginImage from "../images/images/shape-reg-provider-3.webp"
import Navbar from "../components/Landing Page copy/Navbar"



const Form = () => {

  const Navigate = useNavigate()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


  const [loading, setLoading] = useState(false)
  const [showpassword, setshowpassword] = useState(false)
  const togglepassword = () => {
    setshowpassword(!showpassword)

  }



  const [formvalue, setFormValue] = useState({
    username: "",
    email: "",
    mobileno: "",
    password: "",
    usertype: "",

  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formvalue,
      [name]: value
    })



  }


  const handleSubmit = async (e) => {
    try {

      e.preventDefault()
      setLoading(true)

      if (formvalue.mobileno.length < 10) {
        Swal.fire({
          icon: "error",
          title: "Please Enter a valid mobile number",

        });
        setLoading(false)

        return
      }

      if (!emailRegex.test(formvalue.email)) {
        Swal.fire({
          icon: "error",
          title: "Please Enter a valid email",

        });
        setLoading(false)

        return

      }

      const registerresponse = await axios.post("/Hospital/user/register",
        formvalue,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

      )

      if (registerresponse.data.status === "success") {
        setLoading(false)

        Swal.fire({
          title: registerresponse.data.message,
          icon: "success",
          draggable: true
        });
        Navigate("/login")
      }

      else {
        setLoading(false)

        Swal.fire({
          icon: "error",
          title: registerresponse.data.message,
          // text: "Something went wrong!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      }





    } catch (error) {
      setLoading(false)
      console.log("register response error", error)


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

      <Navbar />

      <div className="login-main-container"  style={{marginTop:"-20px"}} >

        <div className="login-card-wrapper"  >

          {/* LEFT SIDE IMAGE */}
               <img src={loginImage} alt="" style={{width:"50%"}}  />

          {/* <img src={loginImage} alt="" style={{width:"50%"}}  /> */}


          {/* RIGHT SIDE FORM */}
          <div className="login-right-section">
            <div className="login-card">
              <h2>Register</h2>
              <p className="subtitle">Welcome...</p>
              <form onSubmit={handleSubmit}>
                <div className="input-group">

                  <input type="username" placeholder="username" required name="username" onChange={handleChange} value={formvalue.username} />
                </div>
                <div className="input-group">
                  <label>Mobile NO</label>
                  <input type="mobileno" placeholder="mobileno" maxLength={10} required name="mobileno" onChange={handleChange} value={formvalue.mobileno} />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" required name="email" onChange={handleChange} value={formvalue.email} />
                </div>
                <div className="input-group password-group">
                  <label>Password</label>
                  <input
                    type={showpassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    name="password"
                    onChange={handleChange}
                    value={formvalue.password}
                  />
                  <span className="eye-icon" onClick={togglepassword}>
                    {showpassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>


                <div className="input-group">
                  <label>Usertype</label>
                  <input type="usertype" placeholder="usertype" required name="usertype" onChange={handleChange} value={formvalue.usertype} />
                </div>
                <button type="submit" className="login-btn">
                  Register
                </button>
                <p className="signup-text">Already have an account? <Link to={"/login"}>login</Link></p>
              </form>
              {/* form here */}
            </div>
          </div>

        </div>

      </div>



    </>
  )
}



export default Form;
