FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build the React application - Use this in production
# RUN npm run build

# Install serve to serve the build folder - Use this in production
# RUN npm install -g serve

EXPOSE 5173

# # Command to serve the React application - Use this in production
# CMD ["serve", "-s", "build", "-l", "3000"]

# Command to run the application
CMD ["npm", "run", "dev"]
