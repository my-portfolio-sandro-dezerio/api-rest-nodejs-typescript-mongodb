import dotenv from 'dotenv';

dotenv.config();

export class Environment {
    public static config(key: string): string {
        return process.env[key] || '';
    }
}