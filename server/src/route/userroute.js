import express from "express"

import { logincontroller, registercontroller } from "../controllers/Usercontroller.js";

const userrouter = express.Router();



userrouter.post("/register",registercontroller)
userrouter.post("/login",logincontroller)

export default userrouter