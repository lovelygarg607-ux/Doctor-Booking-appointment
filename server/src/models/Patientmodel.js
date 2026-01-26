import mongoose from "mongoose"

const Patientschema = new mongoose.Schema(
    {



        patientname: {
            type: String,
            required: true,
        },


        patientImage: {

            type: String,
            required: true,
        },

        DOB: {

            type: String,
            required: true,
        },

        gender: {
            type: String,
            required: true,
        },

        bloodgroup: {
            type: String,
            required: true,
        },

        alternateNo: {
            type: String,
            required: true,
        },

        height: {
            type: String,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },

        allergies :{
            type: String,
            required: true,
        },


        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "users",
        },

        familymedicalhistory: {
            type: String,
            required: true,
        },
        healthinsurance: {
            type: String,
            required: true,
        },

        excerciseroutine: {
            type: String,
            required: true,
        },
        smoking: {
            type: String,
            required: true
        }
        ,

        alcohol: {
            type: String,
            required: true
        },
        address:{
            type:String,
            required:true
        }








    },
    {
        timestamps: true
    }
)




export const Patientmodel = mongoose.model("Patient", Patientschema)


