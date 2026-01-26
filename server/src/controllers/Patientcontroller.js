import { Patientmodel } from "../models/Patientmodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/Cloudinary.js";
import { Doctormodel } from "../models/Doctormodel.js";

const addPatientController = async (req, res) => {


    try {

        const { patientname, DOB, address, excerciseroutine, gender, bloodgroup, alternateNo,
            height, alcohol, smoking, weight, familymedicalhistory, allergies, userID, } = req.body;

        if ([patientname, gender, DOB, address, excerciseroutine, bloodgroup, alternateNo,
            height, weight, alcohol, smoking, familymedicalhistory, allergies, userID].some((field) => {
                field.trim() === ""
            })

        ) {
            return res.status(200).send(
                {
                    message: "All fields are required",
                    status: "not success"
                }
            )
        }


        const patientprofileimagepath = req.files?.patientImage[0].path
        console.log(patientprofileimagepath)

        if (!patientprofileimagepath) {
            return res.status(200).send(
                {
                    message: "Profile image is required",
                    status: "not success"
                }
            )
        }

        const patientprofileimage = await uploadoncloudinary(patientprofileimagepath)
        console.log(patientprofileimage)


        const patienthealthinsuranceimagepath = req.files?.healthinsurance[0].path
        console.log(patienthealthinsuranceimagepath)

        if (!patienthealthinsuranceimagepath) {
            res.status(200).send({
                message: "Health insurance image is required",
                status: "not success"
            })
        }

        const patienthealthinsuranceimage = await uploadoncloudinary(patienthealthinsuranceimagepath)
        console.log(patienthealthinsuranceimage)


        const existingpatient = await Patientmodel.findOne({ userID })
        if (existingpatient) {
            return res.status(200).send(
                {
                    message: "profile alreday created",
                    status: "not success"
                }
            )
        }

        console.log(existingpatient)

        const Patient = await Patientmodel.create({
            patientname,
            gender,
            bloodgroup,
            alternateNo,
            height,
            weight,
            alcohol,
            smoking,
            allergies,
            address,
            DOB,
            familymedicalhistory,
            excerciseroutine,
            userID,
            patientImage: patientprofileimage.url,
            healthinsurance: patienthealthinsuranceimage.url




        })


        await Usermodel.findByIdAndUpdate(userID, { isprofilecreated: true })

        console.log(Patient)


        res.status(200).send(
            {
                message: "profile create successfully",
                status: "success",
                Patient,
                patientid: Patient._id

            }
        )





    } catch (error) {


        res.status(500).send(
            {
                message: `patient controller error ${error}`,
                status: "failed"
            }
        )


    }


}




const getpatientprofileController = async (req, res) => {


    try {

        const userID = req.params.id
        const existingpatient = await Patientmodel.findOne({ userID }).populate("userID")
        if (!existingpatient) {
            return res.status(200).send(
                {
                    message: "Patient not found",
                    status: "not success"
                }
            )
        }


        res.status(200).send({
            message: "profile fetched successfully",
            status: "success",
            existingpatient
        })



    } catch (error) {

        res.status(500).send(
            {
                message: `get patient profile controller error ${error}`,
                status: "failed"
            }
        )




    }



}



const updatePatientController = async (req, res) => {
    try {

        const { userID } = req.params
        const { patientname, gender, bloodgroup, alternateNo, height, weight, alcohol, smoking, allergies, address, DOB, familymedicalhistory, excerciseroutine } = req.body
        const getpatient = await Patientmodel.findOne({ userID })
        if (!getpatient) {
            res.status(200).send({
                message: "patient profile not found",
                status: "not success"
            })
        }

        const updatedata = { patientname, gender, bloodgroup, alternateNo, height, weight, alcohol, smoking, allergies, address, DOB, familymedicalhistory, excerciseroutine }
        const updatepatient = await Patientmodel.findOneAndUpdate(getpatient, updatedata, { new: true })
        res.status(200).send(
            {
                message: "patient update successfully",
                status: "success",
                updatepatient
            }
        )


    } catch (error) {

        res.status(500).send(
            {
                message: `update patient controller`,
                status: "failed"
            }
        )


    }
}



const updatepatientimgcontroller = async (req, res) => {

    try {

        const { userID } = req.params
        const patientprofileimagepath = req.files?.patientImage[0].path
        console.log(patientprofileimagepath)

        if (!patientprofileimagepath) {
            res.status(200).send(
                {
                    message: "profile image is  required",
                    status: "not success",
                }
            )
        }


        const patientprofileimage = await uploadoncloudinary(patientprofileimagepath)

        const getpatient = await Patientmodel.findOne({ userID })
        if (!getpatient) {
            res.status(200).send(
                {
                    message: "patient profile not found",
                    status: "not success"
                }
            )
        }

        const updatepatientimage = await Patientmodel.findOneAndUpdate({ userID }, { patientImage: patientprofileimage.url }, { new: true })
        res.status(200).send(
            {
                message: "upadte patient profile successfully",
                status: "success",
                updatepatientimage
            }
        )

    } catch (error) {


        res.status(500).send(
            {
                message: `patient image not updated${error}`,
                status: "failed"
            }
        )
    }


}


const updateInsuranceimgController = async (req, res) => {
    try {


        const { userID } = req.params
        const insuranceimagefilelocalpath = req.files?.healthinsurance[0].path
        console.log(insuranceimagefilelocalpath)

        if (!insuranceimagefilelocalpath) {
            return res.status(200).send(
                {
                    message: "insurance image is required",
                    status: 'not success'
                }
            )
        }

        const insuarnceimage = await uploadoncloudinary(insuranceimagefilelocalpath)

        const getinsuranceimage = await Patientmodel.findOne({ userID })
        if (!getinsuranceimage) {
            res.status(200).send(
                {
                    message: "insurance image is not found",
                    status: "not success"
                }
            )
        }

        const updateinsuranceimg = await Patientmodel.findOneAndUpdate({ userID }, { healthinsurance: insuarnceimage.url }, { new: true })
        res.status(200).send(
            {
                message: "insurance image updated successfully",
                status: "success",
                updateinsuranceimg,
                getinsuranceimage



            }
        )






    } catch (error) {
        res.status(500).send(
            {
                message: `health insurance image not updated`,
                status: "failed"
            }
        )
    }
}



const getDoctorslist = async (req, res) => {

    try {

        const page = req.query.page
        const limit = req.query.limit
        const pageskip = (page - 1) * limit
        const doctorname = req.query.doctorname
        const speciality = req.query.speciality
        const minExp = Number(req.query.minimumexperience);
        const maxExp = Number(req.query.maximumexperience);
        let filter = {};
      

        if (doctorname) {
            filter.doctorname = { $regex: doctorname, $options: "i" }
        }

        if (Number(minExp) && Number(maxExp)) {
            filter.experience = { $gte: minExp, $lte: maxExp }
        }
        if (speciality) {
            filter.speciality = { $regex: speciality, $options: "i" }
        }




        const total = await Doctormodel.countDocuments(filter)
        const doctors = await Doctormodel.find(filter).skip(pageskip).limit(limit).populate("userID").populate("clinics")

        res.status(200).send(
            {
                status: "success",
                totalpages: Math.ceil(total / limit),
                currentpage: page,
                totalrecords: total,
                doctors
            }
        )


    } catch (error) {

        res.status(500).send(
            {
                message: `doctor list error ${error}`,
                status: "not success"
            }
        )
    }


}

const getDoctorprofileByDoctorid = async (req, res) => {
    try {

        const doctorID = req.params.id;

        const existingdoctor = await Doctormodel.findById(doctorID).populate("userID").populate("clinics")
        if (!existingdoctor) {
            return res.status(200).send(
                {
                    message: "Doctor not found",
                    status: "not success"
                }
            )
        }

        return res.status(200).send(
            {
                message: "profile fetched successfully",
                status: "success",
                existingdoctor

            }
        )

    } catch (error) {


        res.status(500).send(
            {
                message: `getdoctorbyid error${error}`,
                status: "failed"
            }
        )



    }
}


export { addPatientController, getpatientprofileController, getDoctorslist, updateInsuranceimgController, updatePatientController, getDoctorprofileByDoctorid, updatepatientimgcontroller }