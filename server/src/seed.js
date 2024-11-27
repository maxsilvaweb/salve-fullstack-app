import pkg from 'pg';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});

// Function to generate a hashed password
function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// Generate user data
function generateUserData() {
  return [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: hashPassword('password123'),
    },
  ];
}

function generateClinicData() {
  const clinics = [];

  // Generate 20 clinics for each service type
  for (const serviceType of SERVICE_TYPES) {
  return [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: hashPassword('password123'),
    },
  ];
  }

  return clinics;
}

1,Salve Fertility
2,London IVF

// Create tables if they don't exist
async function createTables(client) {
  // Create clinics table
  await client.query(`
    CREATE TABLE IF NOT EXISTS clinics (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create patients table
  await client.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      clinic_id VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Tables created successfully (if they did not already exist).');
}

async function seedDatabase() {
  const client = await pool.connect();
  try {
    // Start a transaction
    await client.query('BEGIN');

    // Create tables if they don't exist
    await createTables(client);

    // Seed users
    const users = generateUserData();
    const userInsertQuery = `
      INSERT INTO patients (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
    `;

    for (const user of users) {
      await client.query(userInsertQuery, [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
      ]);
    }

    // Prepare the clinic insert statement
    const clinicInsertQuery = `
      INSERT INTO clinics (name, address, service_type)
      VALUES ($1, $2, $3)
    `;

    // Generate clinic data
    const clinics = generateClinicData();

    // Batch insert clinics with individual queries to ensure proper parameter binding
    for (const clinic of clinics) {
      await client.query(clinicInsertQuery, [
        clinic.name,
        clinic.address,
        clinic.serviceType,
      ]);
    }

    // Commit the transaction
    await client.query('COMMIT');

    console.log(
      `Database seeded successfully with ${users.length} users and ${clinics.length} clinics!`
    );
  } catch (error) {
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');

    console.error('Error seeding database:', error);
    throw error;
  } finally {
    // Release the client back to the pool
    client.release();
  }
}

// Main execution function
async function main() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

main();
