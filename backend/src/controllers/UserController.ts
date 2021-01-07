import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import Users from '../model/Users';

class UserController {
  async create(request: Request , response: Response ){

    const { name, email , password } = request.body;
    const userRepository = getRepository(Users);

    const userExists = await userRepository.findOne({ where: { email }});

    if(userExists){
      return response.sendStatus(409);
    }

    const user = userRepository.create({name, email , password});

    await userRepository.save(user);

    return response.json(user);
  }

  index(request: Request , response: Response ){
    return response.json({ id: request.userId });
  }
}

export default new UserController;   