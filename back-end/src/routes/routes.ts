import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UserController from '../controllers/Users/UserController'
import CategoryController from '../controllers/Category/CategoryController';
import ProductsController from '../controllers/Products/ProductsController';
import jwt from 'jsonwebtoken';

const userController = new UserController();
const categoryController = new CategoryController();
const productsController = new ProductsController();

const routes = express.Router();

// --------------------------------------------------------------------

// Inicio usuários

routes.get('/get-users', celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), userController.getUsers);

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
    password: Joi.string().required().max(15).min(8),
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

// --------------------------------------------------------------------

// Início produtos

routes.post('/get-products', celebrate({
  body: Joi.object().keys({
    user: Joi.number().required(),
    page: Joi.number().required()
  }),
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), productsController.getProductsDateNowOfUser);

routes.post('/create-products', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    img: Joi.string(),
    user: Joi.number().required(),
    date: Joi.number().required(),
    description: Joi.string(),
  }),
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), productsController.createProducts);

routes.post('/edit-product', celebrate({
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
  }),
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), productsController.editProducts);

routes.delete('/delete-products/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.number(),
  }),
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), productsController.removeProducts);

// Fim produtos

// --------------------------------------------------------------------

export default routes;