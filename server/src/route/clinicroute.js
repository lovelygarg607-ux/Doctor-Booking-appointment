import express from "express"
import {upload} from "../middleware/multer.js"


import { addcliniccontroller, getCliniccontroller, updatecliniccontroller, updateDoctorStatus } from "../controllers/Cliniccontroller.js";

const clinicrouter = express.Router();


clinicrouter.post("/addclinic",upload.fields([{name:"clinicImages",maxCount:4}]),addcliniccontroller)
clinicrouter.get("/getclinic/:id",getCliniccontroller)
clinicrouter.patch("/updateclinic/:userID",updatecliniccontroller)
clinicrouter.patch("/approveddoctors",updateDoctorStatus)


export default clinicrouter