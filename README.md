# Express TS API

This repository contains an Express api written in TypeScript (transpilation is done via ts-node). This also contains some features like automatic tests using Jest (transpilation is done via ts-jest), database connection and migrations via Knex (also used to execute queries via query builder), linting via ESlint (transpilation is done via typescript-eslint and linting is complemented with Prettier) supporting TSDoc standard comments (this is done via eslint-plugin-tsdoc)

Technology: NodeJS (Express, TypeScript, PostgreSQL)

## Documentation

## Before running

Be sure that you have created your own .dev.env file in the root of the project, this environment file must have the following variables:

`NODE_ENV="dev" PORT=3000 PGHOST_DEV="db-pg" PGDATABASE_DEV="mydatabase" PGUSER_DEV="dbadmin" PGPASSWORD_DEV="mypassword123" DUMMY_TOKEN="mydummytoken" JWT_SIGN="myjwtsign"`

Feel free to edit the values according to your environment. Just do not edit NODE_ENV since it is used for run-time validations. Be aware that if you edit the values of PORT, PGHOST_DEV, PGDATABASE_DEV, PGUSER_DEV, PGPASSWORD_DEV then you must also edit those values in the file docker-compose.yml

## How to run

You must have installed Docker and docker-compose to be able to run the local environment.

Create a docker volume to store postgresql data locally

`docker volume create --name postgresql`

Navigate to the root of the project and execute the following commands:

`docker-compose build` : This will build the docker image from the Dockerfile definition

`docker-compose up --renew-anon-volumes ` : This will run the docker container from the custom image definition and another one from a pre-defined PostgreSQL database image

Now you are ready for using the Express TS API, you can do any request to http://localhost:PORT/api/v1/

## Migrations

Note: You must have your containers running

In order to create a new migration run the following command:

`docker exec -it express-ts-api knex migrate:make migration_name -x js --knexfile /app/src/database/connection/knexfile.ts --env dev`

In order to run the latest migration batch run the following command:

`docker exec -it express-ts-api knex migrate:latest --knexfile /app/src/database/connection/knexfile.ts --env dev`

Feel free to use any command available in the Knex CLI tool (https://knexjs.org/#Migrations-CLI)

## Tests

Note: You must have your containers running

For unit tests, execute the following command:

`docker exec -it express-ts-api npm run test:unit`

For integration tests, execute the following command:

`docker exec -it express-ts-api npm run test:int`