import 'dotenv/config';
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import * as path from 'path';
import { connect } from './config/db'
import { protect } from './middlewares/authMiddleware';
import { AppLogger } from "./utils/logger";
import passport from 'passport';
import { setupPassport } from './config/passport';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(passport.initialize());

AppLogger.init(process.env.LOG_LEVEL || "info");

connect();
setupPassport();

//Routes
app.use('/auth', authRoutes);

app.get('/ping', (req, res) => {
    res.send('OK');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    AppLogger.info("Server started successfully.");
})
