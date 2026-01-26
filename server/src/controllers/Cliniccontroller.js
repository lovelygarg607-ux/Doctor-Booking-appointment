import { Clinicmodel } from "../models/Clinicmodel.js";
import { Usermodel } from "../models/Usermodel.js";
import { uploadoncloudinary } from "../utils/Cloudinary.js";
import {Doctormodel} from "../models/Doctormodel.js"


const  addcliniccontroller =async(req , res)=>{
       try {
        


        const {clinicname,address,contact,email,closingtime,openingtime,totalDoctors,userID}=req.body
        if([clinicname,address,contact,email,closingtime,openingtime,totalDoctors,userID].some((field)=>{
            field.trim()===""



        })){
            res.status(200).send(
                {
                    message:"All fields are required",
                    status:"not success"
                }
            )
        }


        const existingClinic = await Clinicmodel.findOne({userID,})
            if(existingClinic){
                res.status(200).send(
                    {
                        message:"Clinic already exist ",
                        status:"not success"
                    }
                )
            }


            const clinicimagespath=req.files?.clinicImages?.map(file =>file.path)
            console.log("my clinic images path ",clinicimagespath)

            const images=[]

            if(clinicimagespath.length > 0){
                for(let i=0; i<clinicimagespath.length;i++){
                   
                    const result = await uploadoncloudinary(clinicimagespath[i])
                    images.push(result.url)
                    console.log(result)
                }
            }


       

        const clinic = await Clinicmodel.create({
            clinicname,clinicImages:images,address,contact,email,closingtime,openingtime,totalDoctors,userID

        })


        await Usermodel.findByIdAndUpdate(userID,{isprofilecreated:true})


        res.status(200).send(
            {
                message:"Clinic add successfully",
                status:"success",
                clinic,
                clinicid:clinic._id
            }
        )
    }

    catch(error){
        res.status(500).send(
            {
                message:`Add clinic controller error,${error}`,
                status:"failed"

            }
        )
    }
}


const getCliniccontroller = async(req,res)=>{
    try {
      
        const userID=req.params.id;
        const existingclinic=await Clinicmodel.findOne({userID}).populate("userID");
        if(!existingclinic){
            res.status(200).send(
                {
                    message:"clinic not found",
                    status:"not success"
                }
            )
        }


       return  res.status(200).send(
        {
            message:"profile fetched successfully",
            status:"success",
            existingclinic

        }
       )



    } catch (error) {
        

       return  res.status(500).send(
            {
                message:`get clinic controller${error}`,
                status:"failed"
            }
        )



    }
}



const updatecliniccontroller = async(req , res)=>{
    try {
      
        
        const {userID}=req.params

        const{clinicname,address,contact,email,closingtime,openingtime,totalDoctors}=req.body
    const getclinic=await Clinicmodel.findOne({userID})
    if(!getclinic){
        res.status(200).send(
            {
                message:"clinic profile not found ",
                status:"not success"
            }
        )
    }


    const updatedata={
    clinicname,address,contact,email,closingtime,openingtime,totalDoctors
    }

    const updateclinic=await Clinicmodel.findOneAndUpdate(getclinic,updatedata,{new:true})


    res.status(200).send(
        {
            message:"update clinic profile successfully",
            status:"success",
            updateclinic
        }
    )
       
    

    } catch (error) {
       
        

        res.status(500).send(
            {
                message:`update clinic controller ${error}`,
                status:"not success"
            }
        )


    }
}


const updateDoctorStatus = async(req , res)=>{
    try {

        const{doctorid,status}= req.body;
        const doctor=await Doctormodel.findByIdAndUpdate(
            doctorid,
            {status},
            {new:true}
        );

        res.status(200).send(
            {
             message:`Doctor ${status}  successfully `,
             doctor,
            }
        )

        
    } catch (error) {

        res.status(500).send(
            {
                message:`status update failed`,
                 error: error.message,
            }
        )
        
    }
}






export {addcliniccontroller , getCliniccontroller,updatecliniccontroller,updateDoctorStatus}
       
