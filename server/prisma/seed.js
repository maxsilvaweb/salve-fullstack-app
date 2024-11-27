import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// Function to read CSV files
async function readCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
  });
}

async function main() {
  try {
    // Clean up existing data incase it already exists
    console.log('Cleaning up existing data...');
    await prisma.patient.deleteMany({});
    await prisma.clinic.deleteMany({});

    // Read CSV files
    const clinicsData = await readCSV(
      path.join(__dirname, '../data/clinics.csv')
    );
    const patients1Data = await readCSV(
      path.join(__dirname, '../data/patients-1.csv')
    );
    const patients2Data = await readCSV(
      path.join(__dirname, '../data/patients-2.csv')
    );

    // Seed clinics
    console.log('Seeding clinics...');
    const clinicMap = new Map();
    for (const clinic of clinicsData) {
      const createdClinic = await prisma.clinic.create({
        data: {
          name: clinic.name,
        },
      });
      clinicMap.set(clinic.id, createdClinic.id);
    }
    console.log('Clinics seeded successfully!');

    // Combine patient data
    const allPatients = [
      ...patients1Data.map((p) => ({
        ...p,
        clinic_id: clinicMap.get(p.clinic_id),
      })),
      ...patients2Data.map((p) => ({
        ...p,
        clinic_id: clinicMap.get(p.clinic_id),
      })),
    ];

    // Seed patients
    console.log('Seeding patients...');
    for (const patient of allPatients) {
      await prisma.patient.create({
        data: {
          clinicId: patient.clinic_id,
          firstName: patient.first_name,
          lastName: patient.last_name,
          dateOfBirth: new Date(patient.date_of_birth),
        },
      });
    }
    console.log('Patients seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
