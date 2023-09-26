const { DB, APP_ENV } = require('../config');
const mongoose = require('mongoose');

const database = DB.NAME;
const host = DB.HOST;
const port = DB.PORT;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://${host}:${port}/${database}`);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;