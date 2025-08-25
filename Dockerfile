# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (not just production) so build works in all cases
RUN npm install

# Copy rest of the code
COPY . .

# Ensure any build step runs (if needed)
# RUN npm run build

# Expose the port your app listens on
EXPOSE 4002

# Start the service
CMD ["npm", "start"]
