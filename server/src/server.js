import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// ====================================================================== //
// Server Bootstrap and Lifecycle Initialization Function                 //
// @params [ ]                                                            //
// @return [Promise<void>]                                                //
// ====================================================================== //
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express listener
    const server = app.listen(PORT, () => {
      console.log(`[Server] Server is running on http://localhost:${PORT}`);
      console.log(`[Server] Health check available at http://localhost:${PORT}/health`);
      console.log(`[Server] Todo API available at http://localhost:${PORT}/api/v1/todos`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal) => {
      console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log("[Server] HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("[Server] Initialization failed:", error.message);
    process.exit(1);
  }
};

startServer();
