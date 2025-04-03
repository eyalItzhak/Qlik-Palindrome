
import { app } from "./app";
import connectDB from "./config/db";

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be define");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if(!await connectDB()) {
    throw new Error("MongoDB connection failed")
  }

  app.listen(3000, () => {
    console.log("process.env.MONGO_URI" ,process.env.MONGO_URI)
    console.log("Listening on port 3000...");
  });
};

start();
