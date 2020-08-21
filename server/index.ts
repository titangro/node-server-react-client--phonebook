import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { config } from './config';
import { initializeModules } from './modules';

const app = express();
dotenv.config();

const DB_CONN = process.env.DB_CONN || '';
const PORT = +(process.env.PORT || 3015);
const HOST = process.env.HOST || '';

mongoose.connect(DB_CONN, config.db.options).then(() => {
  console.log('MONGO IS CONNECTED');
});

// Middlewares
// TODO: realise initMiddleware
app.use(express.json());
// app.use(express.urlencoded());

// Modules
initializeModules(app, '/api');

app.listen(PORT, HOST, () => {
  console.log(PORT);
});
