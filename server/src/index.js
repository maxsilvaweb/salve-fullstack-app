import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Handle the connection
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((e) => {
    console.error('Failed to connect to the database:', e);
  });

const typeDefs = `#graphql
  scalar DateTime

  type Patient {
    id: Int!
    clinicId: Int!
    firstName: String!
    lastName: String!
    dateOfBirth: DateTime!
    createdAt: DateTime!
    clinic: Clinic
  }

  type Clinic {
    id: Int!
    name: String!
    createdAt: DateTime!
    patients: [Patient!]
  }

  type PaginatedPatients {
    patients: [Patient!]!
    totalPages: Int!
  }

  type PaginatedClinics {
    clinics: [Clinic!]!
    totalPages: Int!
  }

  type DeleteResponse {
    id: Int!
    success: Boolean!
    message: String!
  }

  type Query {
    patients(page: Int!, limit: Int!): PaginatedPatients!
    clinics(page: Int!, limit: Int!): PaginatedClinics!
  }

  type Mutation {
    createClinic(name: String!): Clinic!
    updateClinic(id: Int!, name: String!): Clinic!
    deleteClinic(id: Int!): DeleteResponse!
    
    createPatient(
      clinicId: Int!
      firstName: String!
      lastName: String!
      dateOfBirth: DateTime!
    ): Patient!
    
    updatePatient(
      id: Int!
      clinicId: Int
      firstName: String
      lastName: String
      dateOfBirth: DateTime
    ): Patient!
    
    deletePatient(id: Int!): DeleteResponse!
  }
`;

const resolvers = {
  DateTime: {
    __parseValue(value) {
      return new Date(value);
    },
    __serialize(value) {
      return value.toISOString();
    }
  },
  Query: {
    patients: async (_, { page, limit }) => {
      const skip = (page - 1) * limit;
      const [patients, count] = await Promise.all([
        prisma.patient.findMany({
          skip,
          take: limit,
          include: { clinic: true },
        }),
        prisma.patient.count(),
      ]);
      return {
        patients,
        totalPages: Math.ceil(count / limit),
      };
    },
    clinics: async (_, { page, limit }) => {
      const skip = (page - 1) * limit;
      const [clinics, count] = await Promise.all([
        prisma.clinic.findMany({
          skip,
          take: limit,
          include: { patients: true },
        }),
        prisma.clinic.count(),
      ]);
      return {
        clinics,
        totalPages: Math.ceil(count / limit),
      };
    },
  },
  Mutation: {
    createClinic: async (_, { name }) => {
      return prisma.clinic.create({
        data: { name },
      });
    },
    updateClinic: async (_, { id, name }) => {
      return prisma.clinic.update({
        where: { id },
        data: { name },
      });
    },
    deleteClinic: async (_, { id }) => {
      await prisma.clinic.delete({
        where: { id },
      });
      return {
        id,
        success: true,
        message: 'Clinic deleted successfully',
      };
    },
    createPatient: async (_, { clinicId, firstName, lastName, dateOfBirth }) => {
      return prisma.patient.create({
        data: {
          clinicId,
          firstName,
          lastName,
          dateOfBirth,
        },
        include: { clinic: true },
      });
    },
    updatePatient: async (_, { id, ...data }) => {
      return prisma.patient.update({
        where: { id },
        data,
        include: { clinic: true },
      });
    },
    deletePatient: async (_, { id }) => {
      await prisma.patient.delete({
        where: { id },
      });
      return {
        id,
        success: true,
        message: 'Patient deleted successfully',
      };
    },
  },
};

async function startServer() {
  try {
    // Initialize Express and HTTP server
    const app = express();
    const httpServer = http.createServer(app);

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // Start the server
    await server.start();

    // Apply middleware
    app.use('/graphql', cors(), express.json(), expressMiddleware(server));

    // Start listening
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

    console.log(`Server ready at http://localhost:4000/graphql`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
