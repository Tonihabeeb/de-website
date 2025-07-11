# Deep Engineering Web – Development Container
# Lightweight Node 20 Alpine image
FROM node:20-alpine

# Install required build tools for some npm packages
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /usr/src/app

# Enable Corepack (includes pnpm, yarn, etc.)
RUN corepack enable

# Copy dependency manifests first for better layer caching
COPY package.json pnpm-lock.yaml* ./

# Install deps – prefer pnpm lockfile, otherwise fallback to npm
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else npm install; fi

# Copy the rest of the source code
COPY . .

EXPOSE 3000

# Default command (overridden by docker-compose / devcontainers)
CMD ["npm", "run", "dev"] 