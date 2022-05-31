import { Request, Response, NextFunction } from "express";
import { IUser } from "../modules/users/model";
import UserService from '../services/user_service';

import express = require('express');

export class UserController {
    private user_service: UserService = new UserService();

    public async get_users(req: Request, res: Response) {
        try {
            const { body } = req;

            const skip = Number(body.skip || 0);
            const limit = Number(body.limit || 5);
            
            const users = await this.user_service.find_all(skip, limit);
            
            return res
                    .status(200)
                    .json({
                        data: users,
                        count: users.length
                    });
        } catch (error) {
            throw error;
        }
    }

    public async get_user(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            const user = await this.user_service.find_by_id(id);

            if(!user) {
                return res
                        .sendStatus(204);
            }

            return res
                    .status(200)
                    .json(user);
        } catch (error) {
            throw error;
        }
    }

    public async create_user(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;

            const user = await this.user_service.create_user(body);

            return res
                    .status(201)
                    .json(user);
        } catch (error) {
            next(error);
        }
    }

    public async update_user(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const { id } = req.params;

            await this.user_service.update_user(id, body);

            return res
                    .sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

    public async delete_user(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await this.user_service.delete_user(id);

            return res
                    .sendStatus(200);
        } catch (error) {
            throw error;
        }
    }
}