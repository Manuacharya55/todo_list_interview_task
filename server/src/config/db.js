import mongoose from "mongoose";

export const connectDB = async () => {
  // If already connected, reuse existing connection (vital for Serverless / Vercel)
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo_app";
    const connectionInstance = await mongoose.connect(mongoUri);
    console.log(`[Database] MongoDB Connected successfully! Host: ${connectionInstance.connection.host}`);
    return connectionInstance;
  } catch (error) {
    console.error("[Database] MongoDB connection failed:", error.message);
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
    throw error;
  }
};
