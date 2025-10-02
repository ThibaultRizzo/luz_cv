/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let error = {
        success: false,
        message: err.message || 'Internal server error',
        status: err.statusCode || 500
    };

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(e => e.message).join(', ');
        error = {
            success: false,
            message: `Validation Error: ${message}`,
            status: 400
        };
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        error = {
            success: false,
            message: `${field} already exists`,
            status: 400
        };
    }

    // Mongoose cast error
    if (err.name === 'CastError') {
        error = {
            success: false,
            message: 'Invalid ID format',
            status: 400
        };
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = {
            success: false,
            message: 'Invalid token',
            status: 401
        };
    }

    if (err.name === 'TokenExpiredError') {
        error = {
            success: false,
            message: 'Token expired',
            status: 401
        };
    }

    // Add error details in development
    if (process.env.NODE_ENV === 'development') {
        error.stack = err.stack;
        error.details = err;
    }

    res.status(error.status).json(error);
};

/**
 * 404 Not Found middleware
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

/**
 * Async error wrapper to catch async function errors
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    errorHandler,
    notFound,
    asyncHandler
};