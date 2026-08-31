import express from "express";
import cors from "cors";
import morgan from "morgan";
import todoRoutes from "./routes/todo.routes.js";
import { globalErrorHandler } from "./utils/errorHandler.js";

// ============================================================= //
// Express App Initialization and Middleware Setup               //
// @params [ ]                                                  `//
// @return [express.Application]                                 //
// ============================================================= //
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/todos", todoRoutes);

// Global Error Handler Middleware
app.use(globalErrorHandler);

export { app };
