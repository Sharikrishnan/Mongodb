# Todo_App
Todo App help you to capture day to day items which need to done

## Packages Used
- Express
- Expect
- Lodash
- Mocha
- Mongodb
- Mongoose
- Nodemon
- SuperTest
- Swagger-ui-express
- Yamljs
- Body-parser
- Nyc
- Eslint

## Getting Started

## Run Test
ATH033032:Node_Todo_App sharikrishnan$ npm run coverage

> todo-api@1.0.0 coverage /Users/sharikrishnan/Documents/NodeProjects/Node_Todo_App
> export NODE_ENV=test && nyc mocha --exit server/**/*.test.js --timeout 5000



Started on port 3000 
  POST /todos
    ✓ should create a new todo (47ms)
    ✓ Should not create todo with invalid body send

  GET /todos
    ✓ Should get all the Todos

  GET /todos/:id
    ✓ Should get todo based on id passed as parameter
    ✓ Should return 404 if the id is invald
    ✓ Should return 404 if record is not found

  DELETE /todos/:id
    ✓ Should get todo based on id passed as parameter
    ✓ Should return 404 if the id is invald
    ✓ Should return 404 if record is not found

  PATCH /todos/:id
    ✓ Should return 404 if the id is invald
(node:9814) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
    ✓ Should return 404 if record is not found
    ✓ Should update todo based on id passed as parameter
    ✓ Should clear completedAt when todo is not completed


  13 passing (166ms)

---------------------|----------|----------|----------|----------|-------------------|
File                 |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------|----------|----------|----------|----------|-------------------|
All files            |    83.62 |       70 |       75 |    83.02 |                   |
 server              |      100 |      100 |      100 |      100 |                   |
  app.js             |      100 |      100 |      100 |      100 |                   |
 server/api          |      100 |       90 |      100 |      100 |                   |
  routes.js          |      100 |       90 |      100 |      100 |                48 |
 server/api/Todo     |    69.09 |    66.67 |    61.11 |    68.63 |                   |
  todo-controller.js |    69.09 |    66.67 |    61.11 |    68.63 |... 87,90,91,93,95 |
 server/config       |    71.43 |       50 |      100 |    71.43 |                   |
  config.js          |    71.43 |       50 |      100 |    71.43 |               4,5 |
 server/db           |      100 |      100 |      100 |      100 |                   |
  mongoose.js        |      100 |      100 |      100 |      100 |                   |
 server/models       |      100 |      100 |      100 |      100 |                   |
  todo.js            |      100 |      100 |      100 |      100 |                   |
---------------------|----------|----------|----------|----------|-------------------|


