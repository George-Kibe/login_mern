import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connect.js"
const app = express();

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

//Start Development server only when we have a valid mongodb connection
connect()
try{
    app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`)
    })
}catch(error){
    console.log("Invalid Server Connection!")
}
