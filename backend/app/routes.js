const express = require('express');

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

// Organizations resource
routes.post('/organizations', OrganizationsController.create);
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
