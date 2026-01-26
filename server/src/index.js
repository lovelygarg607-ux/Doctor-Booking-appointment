import express from "express"
import dotenv from "dotenv"
import { app } from "./app.js"
import ConnectDB from "./db/db.js"


const PORT = 8000;

dotenv.config({
    path: "./env"
})

ConnectDB()

    .then(() => {
        app.listen(process.env.PORT || 8001, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }
    )

    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED", error)
    }

    )


