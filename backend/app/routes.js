const express = require('express');
const routes = express.Router();

const SessionsController = require('./controllers/SessionsController');
const NgosController = require('./controllers/NgosController');
const UsersController = require('./controllers/UsersController');
const IncidentsController = require('./controllers/IncidentsController');

//Home
routes.get('/', (req, res) => {
  return res.json(
      {
        message: 'Hello World!'
      }
    );
});

//Sessions resource
routes.post('/sessions', SessionsController.create);
//routes.delete('/sessions', SessionsController.delete);


//NGOs resource
routes.post('/ngos', NgosController.create);
routes.get('/ngos', NgosController.index);
routes.get('/ngos/:key', NgosController.show);
routes.put('/ngos/:key', NgosController.update);
//routes.patch('/ngos/:key', NgosController.patch);
routes.delete('/ngos/:key', NgosController.delete);

//Users resource
routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:key', UsersController.show);
routes.put('/users/:key', UsersController.update);
//routes.patch('/users/:key', UsersController.patch);
routes.delete('/users/:key', UsersController.delete);

//Incidents resource
routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.get('/incidents/:key', IncidentsController.show);
routes.put('/incidents/:key', IncidentsController.update);
//routes.patch('/incidents/:key', IncidentsController.patch);
routes.delete('/incidents/:key', IncidentsController.delete);

module.exports = routes;
