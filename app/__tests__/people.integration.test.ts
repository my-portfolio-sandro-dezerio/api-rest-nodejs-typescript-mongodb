import supertest from "supertest";

import PeopleFactory from "../utils/rosie";
import PeopleService from "../services/people.service";
import app from "../config/app";
import { connectDatabase, clearDatabase, closeDatabase } from "../database";

const request = supertest(app);
const peopleFactory = new PeopleFactory();
const peopleService = new PeopleService();

describe('People Integration Tests', () => {
    beforeAll(async () => {
        await connectDatabase();
    });

    afterEach(async () => {
        await clearDatabase();
    });

    afterAll(async () => {
        await closeDatabase();
    });

    test('GET - Should not fetch records when database is empty', async () => {
        const response = await request.get('/people').expect(200);
        
        const { data, count } = response.body;

        expect(data).toHaveLength(0);
        expect(count).toBe(0);
    });

    test('GET - Should fetch data.', async () => {
        const peopleAmount = 3;
        const people = peopleFactory.createArrayObjects(peopleAmount);
        await peopleService.createMany(people);

        const response = await request.get('/people').expect(200);
        
        const { data, count } = response.body;

        expect(data).toHaveLength(peopleAmount);
        expect(count).toBe(peopleAmount);
    });

    test('GET BY ID - Should fetch data with a valid id.', async () => {
        const peopleAmount = 8;
        const people = peopleFactory.createArrayObjects(peopleAmount);
        const peopleCreated = await peopleService.createMany(people);
        
        const index = Math.floor(Math.random() * peopleAmount);
        const person = peopleCreated![index];

        const response = await request.get(`/people/${person.id}`).expect(200);
        
        const { body } = response;
        
        expect(body).toBeDefined();
        expect(body.first_name).toBe(person.first_name);
        expect(body._id).toBe(person.id);
    });

    test('GET BY ID - Should not fetch data with an invalid id.', async () => {
        const peopleAmount = 8;
        const people = peopleFactory.createArrayObjects(peopleAmount);
        await peopleService.createMany(people);

        const id = '6470b95b3773cf9741b99999';

        const response = await request.get(`/people/${id}`).expect(204);
        
        const { body } = response;

        expect(body).toEqual({});
    });

    test('POST - Should create a new person.', async () => {
        const payload = peopleFactory.createObject();

        const response = await request.post('/people').send(payload).expect(201);

        const { body } = response;

        expect(body).toBeDefined();
        expect(payload.first_name).toBe(body.first_name);
    });

    test.todo('POST - Should not create a new person when the email already exists.');

    test('PUT - Should update a person.', async () => {
        const peopleAmount = 8;
        const people = peopleFactory.createArrayObjects(peopleAmount);
        const peopleCreated = await peopleService.createMany(people);
        
        const index = Math.floor(Math.random() * peopleAmount);
        const person = peopleCreated![index];

        const first_name = "Pepe";
        person.first_name = first_name;

        const response = await request.put(`/people/${person._id}`).send(person).expect(200);

        const { body } = response;

        expect(body).toBeDefined();
        expect(person.first_name).toBe(first_name);
    });

    test('PUT - Should not update a person with an invalid id.', async () => {
        const peopleAmount = 8;
        const people = peopleFactory.createArrayObjects(peopleAmount);
        const peopleCreated = await peopleService.createMany(people);
        
        const index = Math.floor(Math.random() * peopleAmount);
        const person = peopleCreated![index];

        const first_name = "Pepe";
        person.first_name = first_name;

        const id = '6470caa14fc7fa8f28569999';

        const response = await request.put(`/people/${id}`).send(person).expect(400);

        const { body } = response;

        expect(body).toBeDefined();
        expect(body).toEqual({ message: `Person with id ${id} doesn't exist.`});
    });

    test('PUT - Should not update a person with an invalid id.', async () => {
        const peopleAmount = 8;
        const people = peopleFactory.createArrayObjects(peopleAmount);
        const peopleCreated = await peopleService.createMany(people);
        
        const index = Math.floor(Math.random() * peopleAmount);
        const person = peopleCreated![index];

        const first_name = "Pepe";
        person.first_name = first_name;

        const id = '6470caa14fc7fa8f28569999';

        const response = await request.put(`/people/${id}`).send(person).expect(400);

        const { body } = response;

        expect(body).toBeDefined();
        expect(body).toEqual({ message: `Person with id ${id} doesn't exist.`});
    });

    test('DELETE - Should delete a person.', async () => {
        const peopleAmount = 8;
        const people = peopleFactory.createArrayObjects(peopleAmount);
        const peopleCreated = await peopleService.createMany(people);
        
        const index = Math.floor(Math.random() * peopleAmount);
        const person = peopleCreated![index];

        await request.delete(`/people/${person.id}`).expect(200);
    });

    test('DELETE - Should not delete a person with an invalid id.', async () => {
        const peopleAmount = 8;
        const people = peopleFactory.createArrayObjects(peopleAmount);
        const peopleCreated = await peopleService.createMany(people);

        const id = '6470dacd4d8bc2ad3ae39999'
        const response = await request.delete(`/people/${id}`).expect(400);

        const { body } = response;
        
        expect(body).toBeDefined();
        expect(body).toEqual({ message: `Person with id ${id} doesn't exist.`});
    });
})