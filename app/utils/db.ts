import mongoose from "mongoose";

const connect = async () => {
    
    if (mongoose.connections[0].readyState) return;
    
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Mongo Connection successful");
    } catch (error) {
        throw new Error("Connection to MongoDB failed!");
    }
}

export default connect