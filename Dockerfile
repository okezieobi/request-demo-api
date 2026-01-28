# Use the latest LTS version of Node.js based on Alpine Linux
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Build app
RUN npm run build

# Remove dev dependencies
RUN npm prune --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]