const resolvers = {
    Mutation: {
      notifyInsuranceCompany: async (_, { employeeId }) => {
        console.log(`Notification envoyée à la compagnie d'assurance pour employé ${employeeId}`);
        return `Notification envoyée pour employé ${employeeId}`;
      }
    }
  };
  
  module.exports = resolvers;
  