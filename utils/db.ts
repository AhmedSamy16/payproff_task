import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database connected successfully...");
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default connectDB;
