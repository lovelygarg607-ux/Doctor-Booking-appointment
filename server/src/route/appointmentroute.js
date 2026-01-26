import express from "express"
import { approvedAppointment, bookingappointmentcontroller, cancelappointment, Completeappointment,  getAppointmentList} from "../controllers/Appointmentcontroller.js";



const appointmentrouter=express.Router()
appointmentrouter.post("/bookappointment",bookingappointmentcontroller)
appointmentrouter.patch("/cancelappointment",cancelappointment)
appointmentrouter.patch("/approvedappointment",approvedAppointment)
appointmentrouter.patch("/completeappointment",Completeappointment)
appointmentrouter.get("/appointmentlist",getAppointmentList)


export default appointmentrouter;