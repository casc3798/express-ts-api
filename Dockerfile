FROM public.ecr.aws/bitnami/node:latest

ARG NODE_ENV

ENV NODE_ENV "${NODE_ENV}"

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --quiet

COPY . .

EXPOSE 3000

RUN npm install --quiet -g knex typescript jest ts-jest ts-node

RUN if [ $NODE_ENV = "dev" ]; then npm install --quiet -g ts-node-dev; fi

RUN if [ $NODE_ENV != "dev" ]; then npm run test:unit; fi

RUN if [ $NODE_ENV != "dev" ] ; then npm run test:int; fi

RUN if [ $NODE_ENV != "dev" ]; then knex migrate:latest --knexfile /app/src/database/connection/knexfile.ts --env $NODE_ENV; fi

CMD ["ts-node",  "--transpile-only", "--pretty", "src/server.ts"]