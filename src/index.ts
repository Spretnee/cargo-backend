import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import session from 'express-session';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';

import { initializePassport } from './config/passport.config';
import authRoutes from './routes/auth.routes';

const requiredEnvVars = ['SESSION_SECRET', 'PORT', 'BASE_API', 'REDIRECT_URL'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

const app = express();

app.use(helmet());
app.use(
    cors({
        origin: process.env.REDIRECT_URL,
        credentials: true,
    }),
);
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);

const passport = initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(
        `Server is running at ${process.env.BASE_API}:${process.env.PORT}`,
    );
});
