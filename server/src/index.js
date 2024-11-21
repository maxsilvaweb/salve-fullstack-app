import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const typeDefs = `#graphql
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    created_at: String!
  }

  type Clinic {
    id: ID!
    name: String!
    address: String!
    service_type: String!
    created_at: String!
  }

  type Query {
    clinics(offset: Int, limit: Int): [Clinic!]!
    clinicsCount: Int!
  }

  type Mutation {
    registerUser(first_name: String!, last_name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

const resolvers = {
  Query: {
    clinics: async (_, { offset = 0, limit = 10 }) => {
      const result = await pool.query(
        'SELECT * FROM clinics ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      return result.rows;
    },
    clinicsCount: async () => {
      const result = await pool.query('SELECT COUNT(*) FROM clinics');
      return parseInt(result.rows[0].count);
    },
  },
  Mutation: {
    registerUser: async (_, { first_name, last_name, email, password }) => {
      try {
        const result = await pool.query(
          'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, MD5($4)) RETURNING *',
          [first_name, last_name, email, password]
        );
        return result.rows[0];
      } catch (error) {
        throw new Error('Registration failed');
      }
    },
    login: async (_, { email, password }) => {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND password = MD5($2)',
        [email, password]
      );
      
      if (result.rows.length === 0) {
        throw new Error('Invalid credentials');
      }
      
      return result.rows[0];
    },
  },
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);