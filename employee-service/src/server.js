const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const fs = require("fs");
const path = require("path");
const { verifyIdentity, getEmployee } = require("./resolvers");

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const resolvers = {
  Query: {
    verifyIdentity,
    getEmployee,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(
  "/employee",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4001, () => console.log("Employee Service is running on port 4001"));
