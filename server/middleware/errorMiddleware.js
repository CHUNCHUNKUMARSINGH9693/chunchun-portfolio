// Global error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  console.error('API Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    url: req.originalUrl,
    method: req.method
  });

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An internal server error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

// Route not found handler (404)
const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFound
};
