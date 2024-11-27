FROM node:18-alpine

WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Copy package files
COPY package*.json ./
RUN npm install

# Copy prisma files first
COPY prisma ./prisma/

# Copy the rest of the application
COPY . .

EXPOSE 4000

# Generate Prisma Client at runtime
CMD ["/bin/sh", "-c", "npx prisma generate && nodemon src/index.js"]