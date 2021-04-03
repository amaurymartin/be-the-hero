const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
//const knex = require('../db/db.js');

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});