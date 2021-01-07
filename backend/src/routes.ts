import { Router } from 'express';

const routes = Router();

import authMiddleware from './middleware/authMiddleware';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import TasksController from './controllers/TasksController';


routes.post('/users', UserController.create);
routes.post('/auth', AuthController.autenticate);

routes.use(authMiddleware)
routes.get('/users',UserController.index);


routes.post('/task' ,TasksController.create);
routes.post('/task-index' ,TasksController.index );
routes.delete('/task/:id', TasksController.deleteTask);
routes.put('/update-task/:id', TasksController.updateTask);



export default routes;