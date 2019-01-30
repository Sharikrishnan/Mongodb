require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const yaml = require('yamljs');

const { apiRoutes } = require('./api/routes');

const swaggerDocs = yaml.load('../swagger.yaml');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs));

const routes = apiRoutes();

app.use(routes);

app.listen(port, () => {
    console.log(`Started on port ${port} `);
});

module.exports = { app };
