const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(routes);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
