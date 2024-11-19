import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import session from 'express-session';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';

import { initializePassport } from './config/passport.config';
import authRoutes from './routes/auth.routes';
import { checkRequiredEnvVars } from './utils/environmentCheck';

checkRequiredEnvVars();

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
