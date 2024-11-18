import { Strategy as OpenIDConnectStrategy } from 'passport-openidconnect';
import 'dotenv/config';
import { Profile } from 'passport';

export const googleOpenIDConnectStrategy = new OpenIDConnectStrategy(
    {
        issuer: process.env.ISSUER!,
        authorizationURL: process.env.AUTHORIZATION_URL!,
        tokenURL: process.env.TOKEN_URL!,
        userInfoURL: process.env.USER_INFO_URL!,
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: `${process.env.BASE_API!}:${process.env.PORT!}/auth/oauth2/redirect`,
        scope: 'openid profile email',
    },
    (issuer: string, profile: Profile, cb: (err: any, user: any) => void) => {
        //TODO: Implement user handling
        console.log('User Profile:', profile);
        console.log('Issuer:', issuer);
        console.log({ profile });

        return cb(null, profile);
    },
);
