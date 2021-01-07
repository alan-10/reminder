import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../model/Users';

class AuthController {
  async autenticate(request: Request, response: Response){
    const { email, password } = request.body;

    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({where: { email}})

    if(!user){
      return response.sendStatus(401);
    }

    const isValidPassord = await  bcrypt.compare(password, user.password);

    if(!isValidPassord){
      return response.sendStatus(401);
    }

    const token = jwt.sign({id: user.id}, '$SECRETE@25',{expiresIn: '1d'})
    
    return response.json({
      user,
      token
    });
  }
}

export default new AuthController;