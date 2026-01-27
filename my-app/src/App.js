import React from 'react';
import { Outlet } from "react-router-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from './reducers/Reducers.js';
import { setpatientProfileData } from './reducers/Reducers.js';
import { setClinicProfileData  } from './reducers/Reducers.js';

import axios from "axios"


const  App=()=> {
   const Dispatch = useDispatch()

  

  

  
  const doctorProfile=useSelector((state)=>state.doctorprofile)
  const patientprofile=useSelector((state)=>state.patientprofile)
  const clinicprofile=useSelector((state)=>state.clinicprofile)

    const loginId = localStorage.getItem("loginid");
     








    const getprofile = async () => {
        try {

            const profileresponse = await axios.get(`https://doctor-booking-appointment-6n0v.onrender.com/Hospital/doctor/getdoctor/${loginId}`)
              

            if (profileresponse.data.status === "success") {
                Dispatch(setProfileData(profileresponse.data.existingdoctor))
            }

           


        } catch (error) {

            console.log("get doctor error", error)




        }
    }

    const getPatientprofile = async () => {
    try {
      const patientprofileresponse = await axios.get(`https://doctor-booking-appointment-6n0v.onrender.com/Hospital/patient/getpatient/${loginId}`)
      console.log("Patient response:", patientprofileresponse.data);

      if (patientprofileresponse.data.status === "success") {
        Dispatch(setpatientProfileData(patientprofileresponse.data.existingpatient))
      }
     
    } catch (error) {
      console.log(error)
    }

  }

  const getClinicProfile = async ()=>{
    try {

      const clinicprofileresponse = await axios.get(`https://doctor-booking-appointment-6n0v.onrender.com/Hospital/clinic/getclinic/${loginId}`)
         console.log("clinic response:", clinicprofileresponse.data);
         if(clinicprofileresponse.data.status==="success"){
          Dispatch(setClinicProfileData(clinicprofileresponse.data.existingclinic))
         }
         else{
          console.log("something went wrong")
         }

      
    } catch (error) {
      
      console.log(error)
    }
  }





  useEffect(() => {
    if (!loginId) return;

    if (!doctorProfile?._id) {
      getprofile();
    }

    if (!patientprofile?._id) {
      getPatientprofile();
    }

    if (!clinicprofile?._id) {
      getClinicProfile();
    }

  }, [loginId,Dispatch]);




    return (




        <Outlet />
    );
}

export default App;
