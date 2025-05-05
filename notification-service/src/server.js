const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const fs = require("fs");
const path = require("path");
const { sendConfirmationEmail } = require("./resolvers");

// Define resolvers
const resolvers = {
  Mutation: {
    sendConfirmationEmail,
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

// Set up the GraphQL HTTP server
app.use(
  "/notify-employee",
  graphqlHTTP({
    schema,
    graphiql: true, // Enables the GraphiQL interface
  })
);

app.listen(4003, () =>
  console.log("Notification Service is running on port 4003")
);
