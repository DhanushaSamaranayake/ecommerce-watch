import express, { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

import cors from 'cors';
import { sample_users, WATCHES, watch_tags } from './data';
import jwt from 'jsonwebtoken';
import watchRouter from './routers/watch.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { connectDB } from './configs/database.config';
import router from './routers/watch.router';
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true

}));

app.use("/api/watchs",watchRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
