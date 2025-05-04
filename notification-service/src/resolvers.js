const sendConfirmationEmail = async (_, { email }) => {
  try {
    console.log(`Email envoyé à ${email}`);
    return `Email envoyé à ${email}`;
  } catch (err) {
    console.error("Erreur dans sendConfirmationEmail:", err);
    throw new Error("Failed to send email");
  }
};

module.exports = {
  sendConfirmationEmail,
};
