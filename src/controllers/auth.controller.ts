import { Request, Response } from 'express';

export class AuthController {
    static handleGoogleCallback(req: Request, res: Response) {
        res.redirect(process.env.REDIRECT_URL!);
    }
}
