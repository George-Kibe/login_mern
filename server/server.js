import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import connect from "./database/connect.js"
import router from "./router/route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
//continue from 1:28:15

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hackers know about your stack

const port = 8080

//HTTP Get Request
app.get("/", (req, res) => {
    res.status(201).json("Home Get request")
})

//api routes
app.use("/api", router)

//Start Development server only when we have a valid mongodb connection
mongoose.set('strictQuery', false)
try{
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    console.log("MongoDB Connected!");
    try{
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    }catch(error){
        console.log("Invalid Server Connection!")
    }

}catch(error){
    console.log("Database Connection Error!")
}
