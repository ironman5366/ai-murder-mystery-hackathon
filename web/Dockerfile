# Step 1: Use an official node image as a base
FROM node:20.15.1

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose port 3000
EXPOSE 3000

# Step 7: Start the React development server
CMD ["npm", "start"]