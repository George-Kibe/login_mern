import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt"

export const register= async (req, res) => {
    try{
        const {email, username, password, profile} = req.body;
        //check if the user already exists using email and username
        const existUsername = await UserModel.findOne({username})
        const existEmail = await UserModel.findOne({email})
        if(existUsername){return res.status(500).json("Username Already Exists!")}
        if(existEmail){return res.status(500).json("Email Already Exists!")}
        //generate encrypted password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        //create a new user
        const newUser = new UserModel({
            username: username,
            email:email,
            password:hashedPassword,
            profile:profile || " "
        });
        //save a user and send response
        const user = await newUser.save();
        res.status(201).json({username: user.username, email:user.email, message:"User Registered Successfully!" })       
    }catch(error){
        return res.status(500).json("Internal Server Error! Ensure you have all fields!")
    }
}

export async function login(req, res){
    res.json("Login route")
}
export async function getUser(req, res){
    res.json("Get User route")
}
export async function updateUser(req, res){
    res.json("Update user route")
}
export async function generateOTP(req, res){
    res.json("GenerateOTP route")
}

export async function verifyOTP(req, res){
    res.json("VERIFY route")
}
export async function createResetSession(req, res){
    res.json("create Reset Session route")
}
export async function resetPasswood(req, res){
    res.json("Reset Password route")
}