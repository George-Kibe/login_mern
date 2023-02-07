import { Router } from "express";
const router = Router()

//import all controllers
import * as controller from "../controllers/appController.js"


//POST Methods
router.route("/register").post(controller.register) //register user
router.route("/registermail").post(); //send email
router.route("/authenticate").post((req,res) => res.end()); //authenticate user
router.route("/login").post(controller.login); //login in app

//GET Methods
router.route("/user/:username").get(controller.getUser) //get user with username
router.route("/generateOTP").get(controller.generateOTP) //generate random OTP
router.route("/veifyOTP").get(controller.verifyOTP) //verify genearated OTP
router.route("/createResetSession").get(controller.createResetSession) //reset all the variables

//PUT Methods
router.route("/updateUser").put(controller.updateUser) //used to update the user profile
router.route("/resetPasswood").put(controller.resetPasswood) // used to reset password



export default router;