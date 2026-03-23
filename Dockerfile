# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of the code
COPY . .

# Expose port (Cloud Run will override via PORT env)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]