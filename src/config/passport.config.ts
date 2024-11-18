import passport from 'passport';
import { googleOpenIDConnectStrategy } from '../google-oidc-strategy';

export const initializePassport = () => {
    passport.use(googleOpenIDConnectStrategy);

    passport.serializeUser((user: Express.User, done) => {
        console.log('serializing:', user);
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('deserializing:', user);
        done(null, user);
    });

    return passport;
};
