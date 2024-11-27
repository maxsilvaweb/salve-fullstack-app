import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    console.log('Clearing database...');
    
    // Delete all records in the correct order due to foreign key constraints
    await prisma.patient.deleteMany();
    console.log('Cleared patients table');
    
    await prisma.clinic.deleteMany();
    console.log('Cleared clinics table');
    
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
