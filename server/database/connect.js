import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
dotenv.config();

async function connect(){
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true})
        .then(() => {
            console.log("MongoDB Connected!");
        })
        .catch((error) => console.log("Database Connection Error!"));
}

export default connect;

// async function connectOther(){
//     const mongodb = await MongoMemoryServer.create();
//     const mongoUri = mongodb.getUri();

//     const db = await mongoose.connect(mongoUri);
//     console.log("Mongo Database Connected!")
//     return db
// }
