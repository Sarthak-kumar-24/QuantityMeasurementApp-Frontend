FROM node:20-alpine
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your frontend code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run the dev server and explicitly expose it to the Docker network
CMD ["npm", "run", "dev", "--", "--host"]