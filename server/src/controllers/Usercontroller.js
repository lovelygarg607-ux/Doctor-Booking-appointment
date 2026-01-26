import { Usermodel } from "../models/Usermodel.js";


const registercontroller = async (req, res) => {
   try {
      const { username, email, password, mobileno, usertype } = req.body


      if ([username, email, password, mobileno, usertype].some((field) => {
         field.trim() === ""



      }))

         return res.status(200).send(
            {
               message: "All fields are required",
               status: "not success"
            }
         )


      const user = await Usermodel.findOne({ email })

      if (user) {
         return res.status(200).send({
            message: "User already exist ",
            status: "not success"
         })
      }


      const createuser = await Usermodel.create({
         username,
         email,
         mobileno,
         password,
         usertype,
      })


      res.status(200).send({
         message: "User register successfully",
         status: "success",
         profile: createuser

      })






   } catch (error) {

      res.status(500).send({
         message: `register user error:${error} `,
         status: "failed"
      })

   }


}


const logincontroller = async (req, res) => {
   try {

      const { email, password } = req.body;

      if ([email, password].some((field) => {
         field.trim() === ""
      }))

         return res.status(200).send({
            message: "All fields are required",
            status: "not success"
         })

      const user = await Usermodel.findOne({ email })
      if (!user) {
         return res.status(200).send({
            message: "Please register first",
            status: "not success"
         })
      }

      const matchpassword = await user.isPasswordCorrect(password)
      if (!matchpassword) {
         return res.status(200).send({
            message: "Invalid email or password",
            status: "not success"
         })
      }

      const token = await user.generateAccessToken();

      res.status(200).send({

      
         message: "User login successfully",
         status: "success",
         loginid: user._id,
         token,
         role: user.usertype,
         isprofilecreated: user.isprofilecreated,

      })







   } catch (error) {

      res.status(500).send({
         message: `login controller error :${error}`,
         status: "failed"
      })
   }

}


export { registercontroller, logincontroller }