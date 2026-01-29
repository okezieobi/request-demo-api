# --- Stage 1: Build ---
FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency files first to leverage Docker cache
COPY package*.json ./
# We need devDependencies to run 'tsc'
RUN npm install

# Copy source and config files (tsconfig.json is required for build)
COPY src ./src
COPY tsconfig.json .

# Run the build script defined in your package.json
RUN npm run build

# --- Stage 2: Production ---
FROM node:lts-alpine

WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies (skips husky, eslint, tsc, etc.)
# Use --ignore-scripts to prevent the 'prepare' script from running
RUN npm install --omit=dev --ignore-scripts

# Copy the compiled JS from the builder stage
# Adjust 'dist' if your tsconfig.json 'outDir' is different
COPY --from=builder /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Start using the production command
CMD ["npm", "start"]