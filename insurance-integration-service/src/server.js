const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

const app = express();

const schema = buildSchema(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4004, () => console.log('Insurance Integration Service running on port 4004'));
