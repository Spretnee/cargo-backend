import passport from 'passport';
import { googleOpenIDConnectStrategy } from '../services/google-oidc-strategy';

export const initializePassport = () => {
    passport.use(googleOpenIDConnectStrategy);

    passport.serializeUser((user: Express.User, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        done(null, user);
    });

    return passport;
};
