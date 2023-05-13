import { Gender } from '../enums/gender.enum';
import mongoose, { Types, Schema, Document } from 'mongoose';

export interface PersonInput {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    gender: string;
    date_of_birth: Date
}

export interface PersonDocument extends PersonInput, Document {
    updatedAt: Date;
    createdAt: Date;
}

const PersonSchema = new mongoose.Schema<PersonDocument>(
    {
        first_name: { type: String, required: [true, "The first name is required."] },
        last_name: { type: String },
        email: { type: String, required: [true, "The email is required."], unique: true, validate: {
            validator: function(v: string) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please type a valid email."
        }},
        phone_number: { type: Number },
        gender: { type: String, enum: Gender, required: [true, "The gender is required."] },
        date_of_birth: { type: Date, required: [true, "The date of birth is required."] },
    },
    {
        timestamps: true,
    }
);

const personModel = mongoose.model("Person", PersonSchema);

export default personModel;