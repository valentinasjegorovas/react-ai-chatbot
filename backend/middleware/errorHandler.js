
export function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  const statusCode = err.status || err.statusCode || 500;

  
  const errorMessages = {
    400: "Bad request. Please check your input.",
    401: "Authentication error. Please contact support.",
    403: "Access forbidden.",
    404: "Resource not found.",
    429: "Rate limit exceeded. Please try again later.",
    500: "Something went wrong. Please try again.",
  };

  const message = errorMessages[statusCode] || errorMessages[500];

  res.status(statusCode).json({ error: message });
}

