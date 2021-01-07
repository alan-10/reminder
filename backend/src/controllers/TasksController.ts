import { Request, Response } from 'express';

import { getRepository, ObjectID } from 'typeorm';
import Tasks from '../model/Tasks';

class TasksController {
  async create(request: Request, response: Response) {

    const {
      description,
      yarTask,
      hourTask,
      isCheked,
      hourInMinutes,

    } = request.body;

    const user_id = request.userId;

    const data = {
      description,
      yarTask,
      hourTask,
      isCheked,
      hourInMinutes,
      user_id
    }

    const taskRepository = getRepository(Tasks);

    const taskExists = await taskRepository.findOne({ where: { yarTask, hourTask, user_id } });

    if (taskExists) {
      return response.sendStatus(409);
    }

    const task = taskRepository.create(data);

    await taskRepository.save(task);

    return response.json(task);

  }


  async index(request: Request, response: Response) {

    const { yarTask } = request.query;
    const user_id = request.userId;

    const taskRepository = getRepository(Tasks);

    const task = await taskRepository.find({
      where: { yarTask, user_id },
      order: { hourInMinutes: 'ASC' }
    });


    if (task[0] == null) {
      return response.sendStatus(404);
    }

    return response.json(task);

  }


  async deleteTask(request: Request, response: Response) {
    const { id } = request.params;

    const user_id = request.userId;

    const taskRepository = getRepository(Tasks);

    const isTask = await taskRepository.find({ where: { user_id, id } });

    if (isTask) {
      taskRepository.delete(id);
      return response.sendStatus(200);

    } else {
      response.sendStatus(409);
    }

  }


  async updateTask(request: Request, response: Response) {

    const { id } = request.params;
    const { isCheked } = request.query;

    const tasksRepository = getRepository(Tasks);

    const isTasks = await tasksRepository.findOne(id);

    if (!isTasks) {
      response.sendStatus(409);
    }

    const cheke = (isCheked == 'true') ? true : false;
    await tasksRepository.update(id, { isCheked: cheke } );

    return response.json(isTasks);

  }
}

export default new TasksController;   