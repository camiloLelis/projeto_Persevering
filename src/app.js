import express from 'express';

import userRoutes from './routes/usersRoutes.js';
import errorHandlerJson from './utils/errorHandlerJson.js'


const app = express();

app.use(express.json());
app.use(errorHandlerJson.jsonError);
app.use('/users', userRoutes);
const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: XXXXXXXXXXXXXXXX:${PORT}`));