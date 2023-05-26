import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

import { Environment } from '../config/environment';

dotenv.config();

export async function database() {
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

const mongod = MongoMemoryServer.create();

export async function connectDatabase() {
    const url = (await mongod).getUri();
    await mongoose.connect(url);
}

export async function closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    (await mongod).stop();
}

export async function clearDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}