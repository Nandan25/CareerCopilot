import 'dotenv/config';
import express from "express";
import cors from 'cors';
import * as path from 'path';
import { connect } from './config/db'
import { protect } from './middlewares/authMiddleware';
import { AppLogger } from "./utils/logger";


const app = express();

app.use(express.json());
app.use(cors());

AppLogger.init(process.env.LOG_LEVEL || "info");

connect();

//Routes


app.get('/ping', (req, res) => {
    res.send('OK');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    AppLogger.info("Server started successfully.");
})
