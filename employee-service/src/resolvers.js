const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgres',
  user: 'user',
  password: 'password',
  database: 'rh_management',
  port: 5432
});

// Log the parameters and query for verification
const verifyIdentity = async (_, { name, employeeId, address, ssn }) => {
  console.log("Verifying identity with the following parameters:");
  console.log("Name:", name);
  console.log("Employee ID:", employeeId);
  console.log("Address:", address);
  console.log("SSN:", ssn);

  try {
    const res = await pool.query(
      'SELECT * FROM employees WHERE employee_id = $1 AND name = $2 AND address = $3 AND ssn = $4',
      [employeeId, name, address, ssn]
    );

    console.log("verifyIdentity query result:", res.rows);
    return res.rowCount > 0;
  } catch (err) {
    console.error("Error in verifyIdentity query:", err.stack);
    throw new Error('Error verifying identity');
  }
};

// Log the query and the result for getEmployee
const getEmployee = async (_, { employeeId }) => {
  console.log("Fetching employee details for Employee ID:", employeeId);

  try {
    const res = await pool.query(
      'SELECT * FROM employees WHERE employee_id = $1',
      [employeeId]
    );

    console.log("getEmployee query result:", res.rows);
    return res.rows[0];
  } catch (err) {
    console.error("Error in getEmployee query:", err.stack);
    throw new Error('Error fetching employee details');
  }
};

module.exports = { verifyIdentity, getEmployee };
