FROM node:20-slim

# Install necessary build tools for bcrypt
RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

# Only copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies (This builds Linux binaries)
RUN npm install

# Copy source code ONLY
COPY . .

CMD ["npm", "run", "dev"]
