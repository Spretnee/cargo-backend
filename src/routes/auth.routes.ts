import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.get('/login', passport.authenticate('openidconnect'));
router.get(
    '/oauth2/redirect',
    passport.authenticate('openidconnect', {
        failureRedirect: '/login',
        failureMessage: true,
    }),
    AuthController.handleGoogleCallback,
);

export default router;
