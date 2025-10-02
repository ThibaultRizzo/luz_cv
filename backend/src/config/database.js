const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Modern MongoDB driver options
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds
            maxPoolSize: 10 // Maintain up to 10 socket connections
        });

        console.log(`📊 MongoDB Connected: ${conn.connection.host}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('📊 MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('📊 MongoDB reconnected');
        });

        return conn;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('📊 MongoDB connection closed');
    } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
    }
};

module.exports = {
    connectDB,
    disconnectDB
};