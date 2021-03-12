import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UserController from '../controllers/UserController'

const userController = new UserController();

const routes = express.Router();

routes.post('/create-user', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.number().required(),
    })
}), userController.create);


export default routes;