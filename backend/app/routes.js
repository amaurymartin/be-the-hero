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
routes.post('/sessions', SessionsController.create);

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
routes.get('/organizations/:key', OrganizationsController.show);
routes.put('/organizations/:key', OrganizationsController.update);
// routes.patch('/organizations/:key', OrganizationsController.patch);
routes.delete('/organizations/:key', OrganizationsController.delete);

// Incidents resource
routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.get('/incidents/:key', IncidentsController.show);
routes.put('/incidents/:key', IncidentsController.update);
// routes.patch('/incidents/:key', IncidentsController.patch);
routes.delete('/incidents/:key', IncidentsController.delete);

module.exports = routes;
