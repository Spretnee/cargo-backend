import { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(`${process.env.REDIRECT_URL}`);
};
