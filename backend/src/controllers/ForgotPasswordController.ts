import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { getRepository } from 'typeorm';

import Users from '../model/Users';
import TokenOfUsers from '../model/TokenOfUsers';

import  etherealMailer from '../email/etherealMailer';

class ForgotPasswordController {

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body

    const userRepository = getRepository(Users);
    const tokenUserRepository = getRepository(TokenOfUsers);



    try {

      const userExists = await userRepository.findOneOrFail({ where: { email } });

      const id = userExists.id;

      const token = jwt.sign({ id: userExists.id }, 'SECRETE@25', { expiresIn: '30m' });

      const data = {
        token,
        isValid: true,
        user_id: id as number
      };

      const tokenOfUser = tokenUserRepository.create(data);

      await tokenUserRepository.save(tokenOfUser);

      const url = `<a href="http://localhost:3000/reset-password/?token=${token}">clique no link para recuperar a senha.</a>`;

      etherealMailer(userExists.email,url );

      return response.json(tokenOfUser);

    } catch (err) {
      return response.sendStatus(401);
    }
  }
}

export default new ForgotPasswordController;