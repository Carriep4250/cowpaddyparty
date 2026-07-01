FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy built files
COPY dist ./dist
COPY api ./api
COPY db ./db
COPY contracts ./contracts
COPY drizzle.config.ts ./
COPY .env ./

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "dist/boot.js"]
