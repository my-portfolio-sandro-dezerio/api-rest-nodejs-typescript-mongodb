import { Environment } from '../config/environment';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export async function connectDatabase() {
    try {
        const url = Environment.config("DATABASE_URL");
        const name = Environment.config("DATABASE_NAME");

        await mongoose.connect(url, {
            dbName: name,
            autoCreate: true
        });

        console.log("Database connected.");
    } catch (error) {
        console.log("Error trying to connect database...", error);
    }
}

export async function disconnectDatabase() {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log("Error trying to disconnect database...", error);
    }
}