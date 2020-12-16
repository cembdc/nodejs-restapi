# Nodejs-Restapi-Boilerplate

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/5e98f54d5b3a41ae87355a3106c889cf)](https://www.codacy.com/gh/CemBdc/nodejs-restapi/dashboard?utm_source=github.com&utm_medium=referral&utm_content=CemBdc/nodejs-restapi&utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.com/CemBdc/nodejs-restapi.svg?branch=master)](https://travis-ci.com/CemBdc/nodejs-restapi)
[![Coverage Status](https://coveralls.io/repos/github/CemBdc/nodejs-restapi/badge.svg?branch=master)](https://coveralls.io/github/CemBdc/nodejs-restapi?branch=master)

A Boilerplate/Starter Project for building RESTful APIs using Node.js, Express, and Mongoose.

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
-   **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
-   **Santizing**: sanitize request data against xss and query injection
-   **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
-   **Compression**: //TODO: gzip compression with [compression](https://github.com/expressjs/compression)
-   **CI**: continuous integration with [Travis CI](https://travis-ci.org)
-   **Docker support**
-   **Code coverage**: using [coveralls](https://coveralls.io)
-   **Code quality**: with [Codacy](https://www.codacy.com)
-   **Git hooks**: with [husky](https://github.com/typicode/husky)
-   **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
-   **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)

## Getting Started

### Installation

Clone the repo:

```bash
git clone https://github.com/CemBdc/nodejs-restapi.git
cd nodejs-restapi
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

### Running locally:

```bash
npm run start
```

### Lint

```bash
# lint code with ESLint
npm run lint
```

### Test

```bash
# run all tests with Mocha
npm run test

# run test coverage
npm run test:coverage
```

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## Inspirations

- [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)
- [madhums/node-express-mongoose](https://github.com/madhums/node-express-mongoose)
- [kunalkapadia/express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)

## License

[MIT](LICENSE)
