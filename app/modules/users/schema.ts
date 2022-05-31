import * as mongoose from 'mongoose';
import { Gender } from '../../enums/gender.enum';
import { Status } from '../../enums/status.enum';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'The first name is required.'],
        minLength: [5, 'The name must have more than 5 letters.'],
        maxLength: [20, 'The name must have less than 20 letters.']
    },
    last_name: {
        type: String,
        required: [true, 'The first name is required.'],
        minLength: [5, 'The name must have more than 5 letters.'],
        maxLength: [20, 'The name must have less than 20 letters.']
    },
    email: {
        type: String,
        required: [true, "The email is required."],
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v: string) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email."
        }
    },
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    phone_number: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        enum: Gender,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: Status,
        default: Status.OK,
        required: [true, 'The status is required.']
    }
});

export default mongoose.model('users', userSchema);