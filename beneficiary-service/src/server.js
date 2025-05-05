const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const fs = require("fs");
const path = require("path");

const {
  createBeneficiary,
  getBeneficiaries,
  updateBeneficiary,
} = require("./resolvers");

// Load SDL schema
const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

// Define resolvers
const resolvers = {
  Query: {
    getBeneficiaries,
  },
  Mutation: {
    createBeneficiary,
    updateBeneficiary,
  },
};

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(
  "/beneficiary",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4002, () =>
  console.log("Beneficiary Service is running on port 4002")
);
