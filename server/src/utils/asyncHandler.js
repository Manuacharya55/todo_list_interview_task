// ====================================================================== //
// Async Handler Wrapper to eliminate try-catch blocks in controllers     //
// @params [requestHandler: Function]                                     //
// @return [express.RequestHandler]                                       //
// ====================================================================== //

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
