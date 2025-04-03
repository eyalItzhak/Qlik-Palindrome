import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    return true
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false
  }
};

export default connectDB;