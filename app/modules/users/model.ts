import { Moment } from "moment";
import { Status } from "../../enums/status.enum";

export interface IUser {
    _id?: String;
    first_name: String;
    last_name: String;
    email: String;
    password: String;
    phone_number: Number;
    gender: String;
    date_of_birth: Moment;
    status: Status;
}