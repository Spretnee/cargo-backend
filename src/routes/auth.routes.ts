import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth.controller';
import { ensureAuthenticated } from '../middleware/auth.middleware';

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
router.get('/user', ensureAuthenticated, AuthController.getUser);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Failed to destroy session' });
            }

            res.clearCookie('connect.sid');
            res.redirect(`${process.env.REDIRECT_URL}`);
        });
    });
});

export default router;
