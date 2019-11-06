import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { resolvers, typeDefs } from './config/schema';
import models from './database/models'
import { getMe } from './utils/getMe';

const app = express();

app.use(bodyParser.json(), cors());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the trakkr graphql api server!')
});

const server = new ApolloServer({
  introspection: true,
  playground: true,
  uploads: false,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const secret = process.env.JWT_SECRET;
    const me = await getMe(req, secret);

    return { models, me, secret };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

export default app;
