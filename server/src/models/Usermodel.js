import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const Userschema = new mongoose.Schema({
    

    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    mobileno:{
        type:String,
        required:true
    },

    usertype:{
      type:String,
      required:true
     
    },

    isprofilecreated:{
        type:Boolean,
        default:false
    }



},
{
    timestamps:true,

}

)

Userschema.pre("save",async function (next){
    if(!this.isModified("password")) return (next);
    this.password = await bcrypt.hash(this.password , 10);
    next();
    
}

)

Userschema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password , this.password)
}


Userschema.methods.generateAccessToken = async function (){
     const token = jwt.sign(

        {

           id:this._id,    
        },
        
            process.env.ACCESS_TOKEN_SECRET,
        
            {
                expiresIn:"2D"
            }

    
     )

     return token
}







export const Usermodel = mongoose.model("users",Userschema) 