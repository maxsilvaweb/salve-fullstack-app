import pkg from 'pg';
import crypto from 'crypto';

const { Pool } = pkg;
const pool = new Pool({
  user: 'admin',
  password: 'password123',
  host: 'localhost',
  port: 5432,
  database: 'health_clinic_db',
});

// Service Types and Cities as constants
const SERVICE_TYPES = [
  'General Practice',
  'Dental Care',
  'Physiotherapy',
  'Cardiology',
  'Pediatrics',
  'Dermatology',
  'Ophthalmology',
  'Mental Health',
  'Orthopedics',
  "Women's Health",
];

const CITIES = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];

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
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      password: hashPassword('securepass456'),
    },
    {
      first_name: 'Michael',
      last_name: 'Johnson',
      email: 'michael.johnson@example.com',
      password: hashPassword('safeword789'),
    },
    {
      first_name: 'Emily',
      last_name: 'Williams',
      email: 'emily.williams@example.com',
      password: hashPassword('protect321'),
    },
    {
      first_name: 'David',
      last_name: 'Brown',
      email: 'david.brown@example.com',
      password: hashPassword('secure654'),
    },
  ];
}

function generateClinicData() {
  const clinics = [];

  // Generate 20 clinics for each service type
  for (const serviceType of SERVICE_TYPES) {
    for (let i = 0; i < 20; i++) {
      const name = `${['Advanced', 'Premier', 'Elite', 'Modern', 'Care'][Math.floor(Math.random() * 5)]} ${serviceType} Clinic`;
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const address = `${Math.floor(Math.random() * 1000) + 1} ${
        ['Main', 'Oak', 'Maple', 'Cedar', 'Pine'][Math.floor(Math.random() * 5)]
      } St, ${city}`;

      clinics.push({
        name,
        address,
        serviceType,
      });
    }
  }

  return clinics;
}

// Create tables if they don't exist
async function createTables(client) {
  // Create users table
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(32) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create clinics table
  await client.query(`
    CREATE TABLE IF NOT EXISTS clinics (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      service_type VARCHAR(100) NOT NULL,
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
      INSERT INTO users (first_name, last_name, email, password)
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
