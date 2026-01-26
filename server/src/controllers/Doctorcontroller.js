import { Doctormodel } from "../models/Doctormodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/Cloudinary.js";
import { Clinicmodel } from "../models/Clinicmodel.js"
import { Patientmodel } from "../models/Patientmodel.js";

const addDoctorController = async (req, res) => {
    try {



        const { doctorname, speciality, degree, experience, gender, address, city, state, pincode, alternateNo, userID } = req.body;


        if ([doctorname, speciality, degree, experience, gender,
            address, city, state, pincode, alternateNo, userID].some((field) => {
                field.trim() === ""
            })) {



            console.log(doctorname, speciality, degree, experience, gender, address, city, state, pincode, userID)




            return res.status(200).send(
                {
                    message: "All fields are required",
                    status: "not success"
                }
            )
        }

        const doctorprofileimagepath = req.files?.profileImage[0].path
        console.log(doctorprofileimagepath)



        if (!doctorprofileimagepath) {
            return res.status(200).send(
                {
                    message: "Profile image is required",
                    status: "not success"
                }
            )
        }



        const doctorprofileimage = await uploadoncloudinary(doctorprofileimagepath)

        console.log(doctorprofileimage)

        const licenseImagepath = req.files?.licenseImage[0].path
        console.log(licenseImagepath)

        if (!licenseImagepath) {
            return res.status(200).send(
                {
                    message: "Licence image is required",
                    status: "not success"
                }
            )
        }

        const licenceimage = await uploadoncloudinary(licenseImagepath)
        console.log(licenceimage)


        const existingdoctor = await Doctormodel.findOne({ userID })

        if (existingdoctor) {
            return res.status(200).send({
                message: "profile alreday created",
                status: "not success"
            })
        }

        const doctor = await Doctormodel.create({
            doctorname,
            speciality,
            experience,
            degree,
            gender,
            alternateNo,
            address,
            city,
            state,
            pincode,



            
            licenseImage: licenceimage.url,

            userID,
            profileImage: doctorprofileimage.url

        })


        await Usermodel.findByIdAndUpdate(userID, { isprofilecreated: true });





        res.status(200).send({
            message: "Profile created successfully",
            status: "success",
            doctor,
            doctorid: doctor._id
        })










    } catch (error) {
        res.status(500).send(
            {
                message: ` doctor controller error ${error}`,
                status: "failed"
            }
        )


    }
}



const getdoctorprofilecontroller = async (req, res) => {
    try {


        const userID = req.params.id

        const existingdoctor = await Doctormodel.findOne({ userID }).populate("userID").populate("clinics")
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
                message: "profile fetched succeessfully",
                status: "success",
                existingdoctor
            }
        )




    } catch (error) {


        res.status(500).send(
            {
                message: `get doctor profile controller error ${error}`,
                status: "failed"
            }
        )


    }
}


const updateDoctorController = async (req, res) => {
    try {

        const { userID } = req.params;
        const { doctorname, speciality, degree, experience, gender, alternateNo } = req.body

        const getdoctor = await Doctormodel.findOne({ userID })

        if (!getdoctor) {
            return res.status(200).send({
                message: "Doctor profile not found",
                status: "not success"
            })
        }

        const updatedata = { doctorname, speciality, degree, experience, gender, alternateNo }

        const updatedoctor = await Doctormodel.findOneAndUpdate(getdoctor, updatedata, { new: true })

        res.status(200).send({
            message: "Doctor profile update successfully",
            status: "success",
            updatedoctor
        })


    } catch (error) {

        res.status(500).send(
            {
                message: "Failed to update",
                status: "failed"
            }
        )
    }

}

const updatedoctorImageController = async (req, res) => {
    try {


        const { userID } = req.params
        const doctorprofileimagepath = req.files?.profileImage[0].path
        console.log(doctorprofileimagepath)
        if (!doctorprofileimagepath) {
            return res.status(200).send(
                {
                    message: " profile image is required",
                    status: "not success"
                }
            )
        }

        const doctorprofileimage = await uploadoncloudinary(doctorprofileimagepath)

        const updatedoctorimg = await Doctormodel.findOneAndUpdate({ userID }, { profileImage: doctorprofileimage.url }, { new: true })

        res.status(200).send(
            {
                message: "doctor image update successfully",
                status: "success",
                updatedoctorimg
            }
        )


    } catch (error) {

        res.status(500).send(
            {
                message: "doctor image not updated",
                status: "failed"
            }
        )
    }



}




const getcliniclist = async (req, res) => {
    try {

        const page = req.query.page
        const limit = req.query.limit || 10


        const pageskip = (page - 1) * limit


        const clinics = await Clinicmodel.find().skip(pageskip).limit(limit)
        const total = await Clinicmodel.countDocuments()

        res.status(200).send(
            {
                status: "success",
                totalpages: Math.ceil(total / limit),
                currentPage: page,
                totalrecords: total,
                clinics
            }
        )

    } catch (error) {


        res.status(500).send(
            {
                mesage: `clinic list error ${error}`,
                status: "failed"
            }
        )
    }







}


const addClinicDoctor = async (req, res) => {
    try {


        const { doctorid, clinicid } = req.body;

        await Doctormodel.findByIdAndUpdate(
            doctorid,
            {
                $addToSet: { clinics: clinicid }
            },
            { new: true }
        )


        res.status(200).send(
            {
                message: "Clnincs added successfully",
                status: "success"
            }
        )



    } catch (error) {

        res.status(500).send(
            {
                message: `add clinic controller error ${error}`,
                status: "failed"
            }
        )
    }
}




















export {
    addDoctorController, updateDoctorController, updatedoctorImageController,
    getdoctorprofilecontroller, getcliniclist, addClinicDoctor 
}

