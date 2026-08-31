import { ApiError } from "./ApiError.js";

// ====================================================================== //
// Global Error Handling Middleware Definition in Utils                   //
// @params [err, req, res, next]                                          //
// @return [express.Response]                                             //
// ====================================================================== //

export const globalErrorHandler = (err, req, res, next) => {
  let error = err;

  // Handle MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const message = `Duplicate value entered for ${field} field`;
    error = new ApiError(400, message);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: error.errors || []
  });
};
