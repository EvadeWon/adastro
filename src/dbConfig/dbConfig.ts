import mongoose from "mongoose";

const mongoUri=process.env.MONGO_URI;
export async function connect(){
    try {
        mongoose.connect(mongoUri!)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("mongodb connected")
        })
        connection.on('error',(err)=>{
            console.log("MongoDB connection error",err)
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong in connecting DB",error)
    }
}