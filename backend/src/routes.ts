import { Router } from 'express';

const routes = Router();

import authMiddleware from './middleware/authMiddleware';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import TasksController from './controllers/TasksController';

import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';



routes.post('/users', UserController.create);
routes.post('/auth', AuthController.autenticate);

routes.put('/forgot-password', ForgotPasswordController.forgotPassword);
routes.put('/reset-password', ResetPasswordController.resetPassword)

routes.use(authMiddleware)


routes.post('/task' ,TasksController.create);
routes.post('/task-index' ,TasksController.index );
routes.delete('/task/:id', TasksController.deleteTask);
routes.put('/update-task/:id', TasksController.updateTask);



export default routes;