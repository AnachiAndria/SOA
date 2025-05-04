const notifyInsuranceCompany = async (_, { employee_id }) => {
  console.log(
    `Notification envoyée à la compagnie d'assurance pour employé ${employee_id}`
  );
  return `Notification envoyée pour employé ${employee_id}`;
};

module.exports = { notifyInsuranceCompany };
