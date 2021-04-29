import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UserController from '../controllers/Users/UserController'
import CategoryController from '../controllers/Category/CategoryController';

const userController = new UserController();
const categoryController = new CategoryController();

const routes = express.Router();

// --------------------------------------------------------------------

// Inicio usuários

routes.get('/getUsers', userController.getUsers);

routes.post('/create-user', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      phone: Joi.string(),
      avatar: Joi.string()
    })
}), userController.createUser);

routes.post('/authenticate', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}), userController.authenticate);

// fim usuários

// --------------------------------------------------------------------

// Inicio categorias

routes.get('/getCategories', categoryController.getCategory);

routes.post('/create-categories', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    parent: Joi.number().allow(null),
  })
}), categoryController.createCategory);

routes.post('/edit-categories', celebrate({
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
    parent: Joi.number().allow(null),
  })
}), categoryController.editCategory);

routes.delete('/delete-categories/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.number()
  })
}), categoryController.removeCategory);

// fim categorias

// --------------------------------------------------------------------

export default routes;