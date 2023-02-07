import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

//Middleware for verify user
export const VerifyUser = async (req, res, next) => {
    try{
        const {username} = req.method == "GET" ? req.query : req.body;
        //check if user exists
        let exist = await UserModel.findOne({username});
        if(!exist) return res.status(404).send({error:"Cannot find user!"});
        next()

    }catch(error){
        return res.status(404).send({error:"Authentication Error!"})
    }
}



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

export const login = async(req, res) =>{
    const {username, password} = req.body;
    try{
        //find a user
        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(400).json({message:"Wrong Username and/or Password!"})
        }
        //validate password
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json("Wrong Username and/or Password!")
        }
        const secret = process.env.JWT_SECRET
        //create jwt token
        const token = jwt.sign({
            userId:user._id,
            username:user.username},
            secret,
            {expiresIn : "24h"}
            )
        //send response
        res.status(200).json({_id:user.id, username:user.username, token,  message:"Logged in Successfully"});
    }catch(error){
        res.status(500).json(error)
    }
}
export const getUser= async(req, res) => {
    const {username} = req.params;
    try{
        if(!username) return res.status(501).send({error:"Invalid Username!"})
        const user = await UserModel.findOne({username})
        if(!user) return res.status(500).send({error:"Couldn't find the user!"})
        //remove password from response
        const {password, ...otherUserAttributes} = Object.assign({}, user.toJSON())
        return res.status(200).send(otherUserAttributes)

    }catch(error){
        return res.status(404).send({error: "Cannot find User Data!"})
    }
}
export const updateUser= async (req, res) => {
    try{
        //const id = req.query.id;
        const {userId} = req.user;

        if(userId){
            const body = req.body;
            //update the user data
            const updatedUser = await UserModel.updateOne({_id:userId}, body)
            if(!updateUser) return res.status(500).send({error:"Error in Updating the User Details!"})
            return res.status(201).send({message:"Details Updated Successfully!"})
        }else{
            return res.status(401).send({error:"User Not Found!"})
        }
    }catch(error){
        return res.status(401).send({error})
    }
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






















