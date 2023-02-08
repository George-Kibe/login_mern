import { Router } from "express";
const router = Router()
import Auth, {localVariables} from "../middlewares/auth.js";
//import all controllers
import * as controller from "../controllers/appController.js"
import { registerMail } from "../controllers/mailer.js";

//POST Methods
router.route("/register").post(controller.register) //register user
router.route("/registermail").post(registerMail); //send email
router.route("/authenticate").post((req,res) => res.end()); //authenticate user
router.route("/login").post(controller.VerifyUser,controller.login); //login in app

//GET Methods
router.route("/user/:username").get(controller.getUser) //get user with username
router.route("/generateOTP").get(controller.VerifyUser,localVariables,controller.generateOTP) //generate random OTP
router.route("/veifyOTP").get(controller.verifyOTP) //verify genearated OTP
router.route("/createResetSession").get(controller.createResetSession) //reset all the variables

//PUT Methods
router.route("/updateUser").put(Auth, controller.updateUser) //used to update the user profile
router.route("/resetPassword").put(controller.VerifyUser,controller.resetPassword) // used to reset password



export default router;