const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const fs = require("fs");
const path = require("path");
const { notifyInsuranceCompany } = require("./resolvers");

// Define resolvers
const resolvers = {
  Mutation: {
    notifyInsuranceCompany,
  },
};

// Read the schema file and parse it using SDL
const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

// Make the schema executable
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(
  "/notify-insurance",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(4004, () =>
  console.log("Insurance Integration Service is running on port 4004")
);
