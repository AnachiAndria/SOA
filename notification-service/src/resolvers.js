const resolvers = {
    Mutation: {
      sendConfirmationEmail: async (_, { email }) => {
        console.log(`Email envoyé à ${email}`);
        return `Email envoyé à ${email}`;
      }
    }
  };
  
  module.exports = resolvers;
  