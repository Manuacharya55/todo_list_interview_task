import express from "express";
import cors from "cors";
import morgan from "morgan";
import todoRoutes from "./routes/todo.routes.js";
import { globalErrorHandler } from "./utils/errorHandler.js";
import { connectDB } from "./config/db.js";

// ============================================================= //
// Express App Initialization and Middleware Setup               //
// @params [ ]                                                  `//
// @return [express.Application]                                 //
// ============================================================= //
const app = express();

app.use(
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Middleware to ensure DB connection (handles serverless cold starts on Vercel)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Root & health check endpoints
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "TaskFlow Todo API is running smoothly!" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/todo", todoRoutes);

// Global Error Handler Middleware
app.use(globalErrorHandler);

export { app };
export default app;
