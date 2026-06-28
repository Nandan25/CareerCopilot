import mongoose from "mongoose";
import { env } from "./env.js";

const connectDatabase = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${env.MONGO_URI}/${env.DB_NAME}`);
        console.log("Connected to the database", connectionInstance.connection.host, " successfully");
    }catch(error){
        throw new Error(`Something went wrong!! ${error}`);
    }
}

export default connectDatabase