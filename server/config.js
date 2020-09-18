import dotenv from 'dotenv';

dotenv.config();

export default {
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PORT: process.env.PORT || 5050,
    CLIENT_URL: process.env.CLIENT_URL || 'CLIENT_URL = http://localhost:3000',
}