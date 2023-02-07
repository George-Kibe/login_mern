import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

//Auth Middleware
const Auth = async(req,res, next) =>{
    try{
        //access authorize header to validate user
        const token= req.headers.authorization.split(" ")[1];
        //retrieve user details
        const secret = process.env.JWT_SECRET;
        const decodedToken = await jwt.verify(token, secret)
        req.user = decodedToken;
        //res.json(decodedToken)
        next()


    }catch(error){
        res.status(401).json({error:"Authentication Failed!"})
    }
}

export default Auth;

export const localVariables = (req,res, next) => {
    req.app.locals={
        OTP:null,
        resetSession:false
    }
    next()
}