const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const { getEmployee, verifyIdentity } = require('./resolvers');

const resolvers = {
  Query: {
    getEmployee,
    verifyIdentity
  },
};

const app = express();

const schema = buildSchema(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4001, () => console.log('Employee Service running on port 4001'));
