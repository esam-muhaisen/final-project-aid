const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { error: err, stack: err.stack });

  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Validation Error",
      details: err.errors,
    });
  }

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message,
  });
};

module.exports = errorHandler;
