import express from 'express';

import './database/connection'
import cors from 'cors';
import routes from './routes';


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);




app.listen(3333, () => {
  console.log('servidor inicializado');
})