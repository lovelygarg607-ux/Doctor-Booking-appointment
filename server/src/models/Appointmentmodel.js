import mongoose from "mongoose"


const Appointmentschema=new mongoose.Schema(
    {
        PatientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Patient",
            required:true,

        },

        DoctorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Doctor",
            required:true,
        },

        ClinicId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"clinic",
            required:true,
        },
         bookingDate: {
            type: String,
            required: true,
            unique: true
        },

        bookingTime: {
            type: String,
            required: true,
            unique: true

        },

        bookingStatus:{
            type:String,
            default:"pending",
             enum: ["pending", "approved", "cancelled", "completed"],
        }


    },
    {
        timestamps:true
    }
)



export const Appointmentmodel=mongoose.model("appointment",Appointmentschema)


