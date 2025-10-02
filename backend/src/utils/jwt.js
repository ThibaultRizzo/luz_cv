const jwt = require('jsonwebtoken');

/**
 * Generate JWT access token
 * @param {Object} payload - Payload to encode in token
 * @returns {String} JWT token
 */
const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || '24h',
            issuer: 'alelunapaint-backend',
            audience: 'alelunapaint-frontend'
        }
    );
};

/**
 * Generate JWT refresh token
 * @param {Object} payload - Payload to encode in token
 * @returns {String} JWT refresh token
 */
const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d',
            issuer: 'alelunapaint-backend',
            audience: 'alelunapaint-frontend'
        }
    );
};

/**
 * Verify JWT access token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded payload
 */
const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, {
        issuer: 'alelunapaint-backend',
        audience: 'alelunapaint-frontend'
    });
};

/**
 * Verify JWT refresh token
 * @param {String} token - JWT refresh token to verify
 * @returns {Object} Decoded payload
 */
const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, {
        issuer: 'alelunapaint-backend',
        audience: 'alelunapaint-frontend'
    });
};

/**
 * Generate token pair (access + refresh)
 * @param {Object} user - User object
 * @returns {Object} Object containing access and refresh tokens
 */
const generateTokenPair = (user) => {
    const payload = {
        userId: user._id,
        username: user.username,
        role: user.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken({ userId: user._id });

    return {
        accessToken,
        refreshToken,
        expiresIn: process.env.JWT_EXPIRE || '24h'
    };
};

/**
 * Extract token from Authorization header
 * @param {String} authHeader - Authorization header value
 * @returns {String|null} Token or null if not found
 */
const extractTokenFromHeader = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
};

/**
 * Decode token without verification (for debugging)
 * @param {String} token - JWT token
 * @returns {Object} Decoded token
 */
const decodeToken = (token) => {
    return jwt.decode(token, { complete: true });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    generateTokenPair,
    extractTokenFromHeader,
    decodeToken
};