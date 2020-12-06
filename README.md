# Nodejs-Restapi-Boilerplate

Boilerplate for API backends with Node.js and Express.

## Directory structure

### Overview

Project `src` structure directories.

```
src/
├─ config/
│  ├─ config.js
├─ controller.js
│  ├─ controller.index.js
│  ├─ userController.js
├─ loader/
│  ├─ express.js
│  ├─ mongoose.js
│  ├─ server.js
├─ middlewares/
│  ├─ middlewares.index.js
│  ├─ validator.js
├─ routes/
│  ├─ routes.index.js
│  ├─ routes.js
│  ├─ userRoute.js
├─ utils/
│  ├─ requestUtil.js
│  ├─ utils.index.js
test/
├─ example.test.js
├─ userController.test.js
└─
```

## Features

-   **ES9**: latest ECMAScript features
-   **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
-   **Authentication and authorization**: using [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-   **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
-   **Logging**: //TODO: winston
-   **Testing**: unit and integration tests using [Mocha](https://mochajs.org/) [Chai](http://chaijs.com/)
-   **Error handling**: centralized error handling mechanism
-   **API documentation**: //TODO: swagger
-   **Dependency management**: with [Npm](https://www.npmjs.com/)
-   **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
-   **Security**: //TODO: set security HTTP headers using [helmet](https://helmetjs.github.io)
-   **Santizing**: sanitize request data against xss and query injection
-   **CORS**: //TODO: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
-   **Compression**: //TODO: gzip compression with [compression](https://github.com/expressjs/compression)
-   **CI**: //TODO: continuous integration with [Travis CI](https://travis-ci.org)
-   **Docker support**
-   **Code coverage**: //TODO: using [coveralls](https://coveralls.io)
-   **Code quality**: //TODO: with [Codacy](https://www.codacy.com)
-   **Git hooks**: //TODO: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
-   **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
-   **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)
