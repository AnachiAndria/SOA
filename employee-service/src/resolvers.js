const { Pool } = require("pg");

const pool = new Pool({
  host: "postgres",
  user: "user",
  password: "password",
  database: "rh_management",
  port: 5432,
});

// Log the parameters and query for verification
const verifyIdentity = async (_, { name, employee_id, address, ssn }) => {
  console.log("Verifying identity with the following parameters:");
  console.log("Name:", name);
  console.log("Employee ID:", employee_id);
  console.log("Address:", address);
  console.log("SSN:", ssn);

  try {
    const res = await pool.query(
      "SELECT * FROM employees WHERE employee_id = $1 AND name = $2 AND address = $3 AND ssn = $4",
      [employee_id, name, address, ssn]
    );

    console.log("verifyIdentity query result:", res.rows);
    return res.rowCount > 0;
  } catch (err) {
    console.error("Error in verifyIdentity query:", err.stack);
    throw new Error("Error verifying identity");
  }
};

// Log the query and the result for getEmployee
const getEmployee = async (_, { employee_id }) => {
  console.log("Fetching employee details for Employee ID:", employee_id);

  try {
    const res = await pool.query(
      "SELECT * FROM employees WHERE employee_id = $1",
      [employee_id]
    );

    console.log("getEmployee query result:", res.rows);
    return res.rows[0];
  } catch (err) {
    console.error("Error in getEmployee query:", err.stack);
    throw new Error("Error fetching employee details");
  }
};

module.exports = { verifyIdentity, getEmployee };
