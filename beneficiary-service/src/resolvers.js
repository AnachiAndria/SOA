const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const pool = new Pool({
  host: 'postgres',
  user: 'user',
  password: 'password',
  database: 'rh_management',
  port: 5432
});

const getBeneficiaries = async (_, { employeeId }) => {
  try {
    const res = await pool.query(
      'SELECT * FROM beneficiaries WHERE employee_id = $1',
      [employeeId]
    );
    return res.rows;
  } catch (err) {
    console.error('❌ Error fetching beneficiaries:', err.stack);
    throw new Error('Error fetching beneficiaries');
  }
};

const createBeneficiary = async (_, { employeeId, name, relation, percentage }) => {
  const beneficiaryId = uuidv4();
  console.log("HEREEEEEE "+ name);
  try {
    const res = await pool.query(
      'INSERT INTO beneficiaries (beneficiary_id, employee_id, name, relation, percentage) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [beneficiaryId, employeeId, name, relation, percentage]
    );
    console.log("Insert result:", res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('❌ Error creating beneficiary:', err.stack);
    throw new Error('Error creating beneficiary');
  }
};

const updateBeneficiary = async (_, { beneficiaryId, name, relation, percentage }) => {
  try {
    const res = await pool.query(
      'UPDATE beneficiaries SET name = $1, relation = $2, percentage = $3, updated_at = NOW() WHERE beneficiary_id = $4 RETURNING *',
      [name, relation, percentage, beneficiaryId]
    );
    return res.rows[0];
  } catch (err) {
    console.error('❌ Error updating beneficiary:', err.stack);
    throw new Error('Error updating beneficiary');
  }
};

module.exports = {
  getBeneficiaries,
  createBeneficiary,
  updateBeneficiary
};
