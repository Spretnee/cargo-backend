import express from 'express';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';
import session from 'express-session';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { initializePassport } from './config/passport.config';
import authRoutes from './routes/auth.routes';
import { checkRequiredEnvVars } from './utils/environmentCheck';
import mapsRoutes from './routes/maps.routes';
import { EventType } from './types/types';

checkRequiredEnvVars();

const corsOptions: CorsOptions = {
    origin: process.env.REDIRECT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: corsOptions,
});

io.on('connection', (socket) => {
    Object.values(EventType).forEach((eventType) => {
        if (
            eventType !== EventType.DISCONNECT &&
            eventType !== EventType.DESTINATION
        ) {
            socket.on(eventType, (data) => {
                console.log(eventType, data);
                socket.broadcast.emit(eventType, data);
            });
        }
    });
    socket.on('disconnect', () => {});

    socket.on(EventType.DESTINATION, (data) => {
        io.emit(EventType.DESTINATION, data);
    });
});

app.use(helmet());
app.use(cors(corsOptions));
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

app.use('/api/maps', mapsRoutes);

app.get('/', (req, res) => {
    res.send('');
});

app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
