import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { Environment } from './environment';
import { PeopleRoutes } from '../routes/people.route';
import { ErrorRoutes } from '../routes/error_routes';
import { connectDatabase } from '../database'

class App {
    public app: Application;

    private people_routes: PeopleRoutes = new PeopleRoutes();
    private error_routes: ErrorRoutes = new ErrorRoutes();

    constructor() {
        this.app = express();

        this.config();

        connectDatabase();

        this.people_routes.route(this.app);

        this.error_routes.route(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(morgan('dev'));
    }
}

export default new App().app;