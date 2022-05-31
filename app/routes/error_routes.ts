import { Application, NextFunction, Request, Response } from 'express';
import { ErrorController } from '../controllers/error_controller';

export class ErrorRoutes {

    private error_controller: ErrorController = new ErrorController();

    public route(app: Application) {
        app.all('*', (req: Request, res: Response, next: NextFunction) => {
            this.error_controller.all_unmatched_routes(req, res, next);
        });

        app.use((error: Error ,req: Request, res: Response, next: NextFunction) => {
            this.error_controller.get_errors(error, req, res, next);
        });
    }
}