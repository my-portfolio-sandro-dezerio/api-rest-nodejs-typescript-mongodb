import { Request, Response, NextFunction } from "express";
import PeopleService from '../services/people.service';

export class PeopleController {
    private people_service: PeopleService = new PeopleService();

    public async get(req: Request, res: Response) {
        try {
            const { query } = req;

            const skip = Number(query.skip || 0);
            const limit = Number(query.limit || 5);
            
            const [people, count] = await Promise.all([
                this.people_service.get(skip, limit),
                this.people_service.count()
            ]);
            
            return res
                    .status(200)
                    .json({
                        data: people,
                        count
                    });
        } catch (error) {
            throw error;
        }
    }

    public async get_by_id(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            const people = await this.people_service.get_by_id(id);

            if(!people) {
                return res
                        .sendStatus(204);
            }

            return res
                    .status(200)
                    .json(people);
        } catch (error) {
            throw error;
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { body } = req;

            const person = await this.people_service.create(body);

            return res.status(201).json(person);
        } catch (error) {
            throw error;
        }
    }

    public async update_by_id(req: Request, res: Response) {
        try {
            const { body } = req;
            const { id } = req.params;

            const person = await this.people_service.get_by_id(id);

            if(!person) {
                return res.status(400).json({ message: `Person with id ${id} doesn't exist.`})
            }

            await this.people_service.update_by_id(id, body);

            return res.sendStatus(200);
        } catch (error) {
            throw error;
        }
    }

    public async delete_by_id(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const person = await this.people_service.get_by_id(id);

            if(!person) {
                return res.status(400).json({ message: `Person with id ${id} doesn't exist.`})
            }

            await this.people_service.delete_by_id(id);

            return res.sendStatus(200);
        } catch (error) {
            throw error;
        }
    }
}