import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UserController from '../controllers/Users/UserController'
import CategoryController from '../controllers/Category/CategoryController';
import ProductsController from '../controllers/Products/ProductsController';

const userController = new UserController();
const categoryController = new CategoryController();
const productsController = new ProductsController();

const routes = express.Router();

// --------------------------------------------------------------------

// Inicio usuários

routes.get('/get-users', userController.getUsers);

routes.post('/create-user', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().max(15).min(8),
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

routes.post('/generate-token-forgot-password', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  })
}), userController.generateTokenForForgotPassword);

routes.post('/forgot-password', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    token: Joi.string().required()
  })
}), userController.forgotPassword);

// fim usuários

// --------------------------------------------------------------------

// Inicio categorias

routes.get('/get-categories', categoryController.getCategory);

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

// Início produtos

routes.get('/get-products', productsController.getProducts);

routes.post('/create-products', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
  })
}), productsController.createProducts);

routes.post('/edit-product', celebrate({
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
  })
}), productsController.editProducts);

routes.delete('/delete-products/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.number(),
  })
}), productsController.removeProducts);

// Fim produtos

// --------------------------------------------------------------------

export default routes;