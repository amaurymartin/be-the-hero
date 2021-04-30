const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

const SessionsController = require('./controllers/SessionsController');
const OrganizationsController = require('./controllers/OrganizationsController');
const IncidentsController = require('./controllers/IncidentsController');

// Home
routes.get('/healthcheck', (_req, res) => {
  res.status(204).send();
});

// Sessions resource
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), SessionsController.create);

// Users resource
// routes.post('/users', UsersController.create);
// routes.get('/users', UsersController.index);
// routes.get('/users/:key', UsersController.show);
// routes.put('/users/:key', UsersController.update);
// // routes.patch('/users/:key', UsersController.patch);
// routes.delete('/users/:key', UsersController.delete);

// Organizations resource
routes.post('/organizations', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    nickname: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    whatsapp: Joi.string().required().min(10).max(11), // Brazilian phoneNumber pattern
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string(),
  }),
}), OrganizationsController.create);
routes.get('/organizations', OrganizationsController.index);
routes.get('/organizations/:key', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().uuid(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    key: Joi.string().required().uuid(),
  }),
}), OrganizationsController.show);
routes.put('/organizations/:key', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().uuid(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    key: Joi.string().required().uuid(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    nickname: Joi.string(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11), // Brazilian phoneNumber pattern
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string(),
  }),
}), OrganizationsController.update);
// routes.patch('/organizations/:key', celebrate({
//   [Segments.HEADERS]: Joi.object({
//     authorization: Joi.string().required().uuid(),
//   }).unknown(),
//   [Segments.PARAMS]: Joi.object().keys({
//     key: Joi.string().required().uuid(),
//   }),
//   [Segments.BODY]: Joi.object().keys({
//     key: Joi.string().required().allow('password'),
//     value: Joi.string().required(),
//   }),
// }), OrganizationsController.patch);
routes.delete('/organizations/:key', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().uuid(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    key: Joi.string().required().uuid(),
  }),
}), OrganizationsController.delete);

// Incidents resource
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().uuid(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    value: Joi.number().required().min(0.01),
  }),
}), IncidentsController.create);
routes.get('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().optional().uuid(),
  }).unknown(),
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().optional().min(0),
    size: Joi.number().optional().min(1),
    sort: Joi.string().optional(),
  }),
}), IncidentsController.index);
routes.get('/incidents/:key', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().optional().uuid(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    key: Joi.string().required().uuid(),
  }),
}), IncidentsController.show);
routes.put('/incidents/:key', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().uuid(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    key: Joi.string().required().uuid(),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    value: Joi.number().optional().min(0.01),
  }),
}), IncidentsController.update);
// routes.patch('/incidents/:key', celebrate({
//   [Segments.HEADERS]: Joi.object({
//     authorization: Joi.string().required().uuid(),
//   }).unknown(),
//   [Segments.PARAMS]: Joi.object().keys({
//     key: Joi.string().required().uuid(),
//   }),
//   [Segments.BODY]: Joi.object().keys({
//     key: Joi.string().required().allow('value'),
//     value: Joi.number().required().min(0.01),
//   }),
// }), IncidentsController.patch);
routes.delete('/incidents/:key', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().uuid(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    key: Joi.string().required().uuid(),
  }),
}), IncidentsController.delete);

module.exports = routes;
