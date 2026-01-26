import mongoose from "mongoose"

import { DB_NAME } from "./../constant.js"

const connectDB = async ()=>{
    try {
       
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);

        console.log(`MONGOOSE CONNECTED!!DB HOST:${connectionInstance.connection.host}`)
        

    } 
    
    catch (error) {
        console.log("MONGODB CONNECTION ERROR",error)
        process.exit(1)
    }
}

export default connectDB;