import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { Environment } from './environment';
import { UserRoutes } from '../routes/user_routes';
import { ErrorRoutes } from '../routes/error_routes';

class App {
    public app: Application;
    public mongo_url: string = Environment.config('MONGO_URL');

    private user_routes: UserRoutes = new UserRoutes();
    private error_routes: ErrorRoutes = new ErrorRoutes();

    constructor() {
        this.app = express();

        this.config();
        this.mongoSetup();

        this.user_routes.route(this.app);

        this.error_routes.route(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(morgan('dev'));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
            .catch((error) => {
                throw new Error(error.message);
            })
    }
}

export default new App().app;