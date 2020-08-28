import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import { config } from '../config';
import { initializeModules } from './modules';

path.resolve(__filename);

const app = express();
dotenv.config();

const DB_CONN = process.env.DB_CONN || '';
const PORT = +(process.env.PORT || 3015);
const HOST = process.env.HOST || '';

const handleError = (error: Record<string, any>) => console.log(error);

// Middlewares
// TODO: realise initMiddleware
app.use(express.json());
// app.use(express.urlencoded());

// Modules
initializeModules(app, '/api');

app.listen(PORT, HOST, async () => {
  console.log('Server ready!');

  await mongoose
    .connect(DB_CONN, config.db.options)
    .then(() => {
      console.log('MONGO IS CONNECTED');
    })
    .catch((error) => handleError(error));

  console.log('Listening on port ', PORT);
});
