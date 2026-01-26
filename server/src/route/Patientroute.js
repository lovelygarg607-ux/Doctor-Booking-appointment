import express from "express"
import { addPatientController, getDoctorprofileByDoctorid, getDoctorslist, getpatientprofileController, updateInsuranceimgController, updatePatientController, updatepatientimgcontroller } from "../controllers/Patientcontroller.js";
import { upload } from "../middleware/multer.js";

const patientrouter = express.Router()
patientrouter.post(
  "/addpatient",
  upload.fields([
    { name: "patientImage", maxCount: 1 },
    { name: "healthinsurance", maxCount: 1 }
  ]),


  addPatientController
);

patientrouter.get("/getpatient/:id",getpatientprofileController)
patientrouter.patch("/updatepatient/:userID",updatePatientController)
patientrouter.patch("/updatepatientimage/:userID", upload.fields([{name:"patientImage" ,maxCount:1}]),updatepatientimgcontroller)
patientrouter.patch("/updatehealthinsuranceimage/:userID", upload.fields([{name:"healthinsurance" ,maxCount:1}]),updateInsuranceimgController)
patientrouter.get("/getdoctorlist",getDoctorslist)
patientrouter.get("/viewProfileBydoctorid/:id",getDoctorprofileByDoctorid)


export default patientrouter



