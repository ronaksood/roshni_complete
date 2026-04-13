import mongoose from "mongoose";
// import dns from 'node:dns';
// dns.setServers(['8.8.8.8', '1.1.1.1']);
import 'dotenv/config';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("Error connecting to MONGODB", error.message);
    process.exit(1);
  }
};
