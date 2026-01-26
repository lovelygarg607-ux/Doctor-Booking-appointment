import express from "express"
import { addClinicDoctor, addDoctorController , getcliniclist, getdoctorprofilecontroller, updateDoctorController, updatedoctorImageController } from "../controllers/Doctorcontroller.js"
import { upload } from "../middleware/multer.js"






const doctorrouter = express.Router()

doctorrouter.post("/adddoctor", upload.fields ([{name:"profileImage",maxCount:1},{name:"licenseImage",maxCount:1}])
 ,addDoctorController)

 doctorrouter.get("/getdoctor/:id" ,getdoctorprofilecontroller)
 doctorrouter.patch("/updatedoctor/:userID",updateDoctorController)
 doctorrouter.patch("/updateprofiledoctor/:userID",upload.fields([{name:"profileImage",maxCount:1}]),updatedoctorImageController)
 doctorrouter.get("/getcliniclist",getcliniclist)
 doctorrouter.post("/addtodoctor",addClinicDoctor)




// Yeh multer middleware ka method hai.

// Isse multiple different fields handle ki ja sakti hain.

// Isme ek array pass kiya gaya hai jisme har object ek file field ko represent karta hai.

export default doctorrouter;



