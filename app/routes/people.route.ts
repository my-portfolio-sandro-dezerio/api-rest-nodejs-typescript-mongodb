import { Application, Request, Response } from 'express';
import { PeopleController } from '../controllers/people.controller';

export class PeopleRoutes {

    private people_controller: PeopleController = new PeopleController();

    public route(app: Application) {
        
        app.get('/people', (req: Request, res: Response) => {
            this.people_controller.get(req, res);
        });

        app.get('/people/:id', (req: Request, res: Response) => {
            this.people_controller.get_by_id(req, res);
        });

        app.post('/people', (req: Request, res: Response) => {
            this.people_controller.create(req, res);
        });

        app.put('/people/:id', (req: Request, res: Response) => {
            this.people_controller.update_by_id(req, res);
        });

        app.delete('/people/:id', (req: Request, res: Response) => {
            this.people_controller.delete_by_id(req, res);
        });

    }
}