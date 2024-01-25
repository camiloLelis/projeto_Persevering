import cors from 'cors';
import express from 'express';
import path from 'path';
import userRoutes from './src/routes/usersRoutes.js';
import errorHandlerReq from './src/utils/errorHandlerReq.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(cors({ origin: process.env.ORIGIN_URL_FRONTEND, credentials: true }));
app.use(express.json());
app.use(errorHandlerReq.errorHandler);
app.use('/users', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));
const PORT =  process.env.PORT;

app.listen(PORT, () => console.log(`Server on port:${PORT}`));