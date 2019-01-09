require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const { apiRoutes } = require('./api/routes');


const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

const routes = apiRoutes();

app.use(routes);

app.listen(port, () => {
    console.log(`Started on port ${port} `);
});

module.exports = { app };
