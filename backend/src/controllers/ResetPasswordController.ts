import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { getRepository } from 'typeorm';
import TokenOfUser from '../model/TokenOfUsers';
import Users from '../model/Users';

class ResetPasswordController {
  async resetPassword(request: Request, response: Response) {
    const { token, password } = request.body;

    const tokenRepository = getRepository(TokenOfUser)
    const userskRepository = getRepository(Users);

    if (!token) {
      return response.sendStatus(401);
    }
 
    try {

      const tokenValid = jwt.verify(token, 'SECRETE@25');

      const tokenOfUser = await  tokenRepository.findOneOrFail({ where: { token}});

      const user = await userskRepository.findOneOrFail({where:{ id: tokenOfUser.user_id}})

      console.log(user);
    } catch (error) {
      console.log(error);
    }




    return response.json({ token, password });
  }


}


export default new ResetPasswordController; 