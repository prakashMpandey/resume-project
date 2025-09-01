import mongoose from "mongoose"

const connectDB=async()=>{
    try {
  const connection=await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
  console.log("database connected");

    } catch (error) {
        console.log("error in connecting database :",error);
    }
}

export default connectDB;