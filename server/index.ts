import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import './envConfig';
import { router } from './routers';

const PORT = process.env.PORT || 5500;
const DB_URL = process.env.DB_URL as string;

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use(fileUpload({}));
app.use('/api', router);
app.use('/files', express.static('static'));

(async function () {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
