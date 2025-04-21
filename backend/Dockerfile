# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set permissions for the working directory
RUN chown -R node:node /app
USER node

# Debugging step to check Node.js and npm versions
RUN node -v && npm -v

# Expose the application port
EXPOSE 3030

# Default command to run the application in development mode
CMD ["npm", "run", "dev"]