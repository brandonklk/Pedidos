import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UserController from '../controllers/UserController'

const userController = new UserController();

const routes = express.Router();

routes.get('/getUsers', userController.getUsers);

routes.post('/create-user', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      phone: Joi.string(),
      avatar: Joi.string()
    })
}), userController.create);

routes.post('/authenticate', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}), userController.authenticate);


export default routes;