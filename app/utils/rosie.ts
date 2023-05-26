import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

export default class PeopleFactory {
    private definition: object;
    private default_size: number;

    constructor() {
        this.default_size = 5;
        this.definition = {
            first_name: () => faker.name.firstName(),
            last_name: () => faker.name.lastName(),
            email: () => faker.internet.email(),
            phone_number: () => faker.phone.number("15########"),
            gender: () => faker.name.sex(),
            date_of_birth: () => faker.date.birthdate(),
        }
    }
    createObject() {
        return Factory.define('people').attrs(this.definition).build();
    };

    createArrayObjects(size: number = this.default_size) {
        return Factory.define('people').attrs(this.definition).buildList(size);
    }
}








