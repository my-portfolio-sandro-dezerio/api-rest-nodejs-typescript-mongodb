import { Request, Response, NextFunction, response } from "express";

export class ErrorController {
    public get_errors(error: Error, req: Request, res: Response, next: NextFunction) {
        res.status(400).json({error});
    }

    public all_unmatched_routes(req: Request, res: Response, next: NextFunction) {
        res.status(500).json({err: "Bad URL"});
    }
}