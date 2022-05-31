import { Error } from 'mongoose';
import { IUser } from '../modules/users/model';
import userSchema from '../modules/users/schema';

export default class UserService {
    public find_all(skip: Number, limit: Number) {
        return userSchema
                        .find()
                        .skip(skip)
                        .limit(limit);
    }

    public find_by_id(_id: String) {
        return userSchema.findById({ _id });
    }

    public async create_user(user: IUser) {
        const uSchema = new userSchema(user);
        return uSchema.validate()
            .then(() => {
                return uSchema.save();
            })
            .catch((error: Error.ValidationError) => {
                const fields = Object.keys(error.errors);
                
                let result_object = {};
                fields.forEach(field => {
                    result_object = {
                        ...result_object,
                        [field]: error.errors[field].message
                    }
                });

                throw {message: result_object};
            });
    }

    public update_user(_id: String, user: IUser) {
        return userSchema.updateOne({ _id }, user, { runValidators: true })
            .then(() => {})
            .catch((error: Error) => {
                if(error instanceof Error.ValidationError) {
                    const fields = Object.keys(error.errors);
        
                    let result_object = {};
                    fields.forEach(field => {
                        result_object = {
                            ...result_object,
                            [field]: error.errors[field].message
                        }
                    });
    
                    throw {message: result_object};
                } else if (error instanceof Error.CastError) {
                    // wrong _id given.
                    throw {message: "Wrong _id"};
                }
            });
    }

    public delete_user(_id: String) {
        return userSchema.deleteOne({ _id });
    }
}