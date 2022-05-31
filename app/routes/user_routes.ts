import { Application, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/user_controller';

export class UserRoutes {

    private user_controller: UserController = new UserController();

    public route(app: Application) {
        
        app.post('/users/grid', (req: Request, res: Response) => {
            this.user_controller.get_users(req, res);
        });

        app.get('/users/:id', (req: Request, res: Response) => {
            this.user_controller.get_user(req, res);
        });

        app.post('/users', (req: Request, res: Response, next: NextFunction) => {
            this.user_controller.create_user(req, res, next);
        });

        app.put('/users/:id', (req: Request, res: Response, next: NextFunction) => {
            this.user_controller.update_user(req, res, next);
        });

        app.delete('/users/:id', (req: Request, res: Response) => {
            this.user_controller.delete_user(req, res);
        });

    }
}