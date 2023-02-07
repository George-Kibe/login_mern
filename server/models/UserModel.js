import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide a unique Username!"],
        unique:[true, "Username Exists!"],
        min:5,
        max:50
    },
    password:{
        type:String,
        required:[true, "Please enter a Password"],
        min:8
    },
    email:{
        type:String,
        required:[true, "Please provide a unique email"],
        unique:true,
        max:50,
    },
    firstName:{type:String},
    lastName:{type:String},
    mobileNo:{type:Number},
    address:{type:String},
    profile:{type:String}
},
{ timestamps:true}
)

export default mongoose.model.Users || mongoose.model("User", UserSchema);