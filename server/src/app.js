import express from "express"
import cors from "cors"
import userrouter from "./route/userroute.js";
import  doctorrouter  from "./route/Doctorroute.js";
import patientrouter from "./route/Patientroute.js";
import clinicrouter from "./route/clinicroute.js";
import appointmentrouter from "./route/appointmentroute.js"


const app = express();

 app.use(cors({
    origin: [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://doctor-booking-appointment-6n0v.onrender.com",
    "https://doctor-booking-appointment-roca.vercel.app"
  ],
  credentials: true
  
 }))






app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use("/Hospital/user", userrouter)
app.use("/Hospital/doctor",doctorrouter)
app.use("/Hospital/patient",patientrouter)
app.use("/Hospital/clinic",clinicrouter)
app.use("/Hospital/appointment",appointmentrouter)

// http://localhost:8000/Hospital/user/register



export { app }
