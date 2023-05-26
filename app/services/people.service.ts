import { Error } from 'mongoose';
import { PersonInput } from '../models/person.model';
import Person from '../models/person.model';

export default class PeopleService {
    public get(skip: number, limit: number) {
        return Person.find().skip(skip).limit(limit);
    }

    public count() {
        return Person.count();
    }

    public get_by_id(id: string) {
        return Person.findById({ _id: id });
    }

    public async create(person: PersonInput) {
        try {
            const newPerson = new Person(person);
    
            return await newPerson.save();
        } catch (error: any) {
            if(error.name === 'MongoServerError' && error.code === 11000 && error.message.includes('duplicate key error')) {
                return new Error('Email already exists.');
            }

            throw error;
        }
    }

    public async createMany(people: PersonInput[]) {
        return await Person.insertMany(people);
    }

    public async update_by_id(id: string, person: PersonInput) {
        await Person.findByIdAndUpdate(id, person);
        /*return userSchema.updateOne({ _id }, user, { runValidators: true })
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
            });*/
    }

    public async delete_by_id(id: string) {
        await Person.findByIdAndRemove(id);
    }
}