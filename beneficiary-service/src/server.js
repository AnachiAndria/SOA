const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const { createBeneficiary, getBeneficiaries, updateBeneficiary } = require('./resolvers');

const resolvers = {
  Query: {
    getBeneficiaries
  },
  Mutation: {
    createBeneficiary,
    updateBeneficiary
  }
};


const app = express();

const schema = buildSchema(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4002, () => console.log('Beneficiary Service running on port 4002'));
