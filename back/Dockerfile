# Create image based on the official Node 6 image from the dockerhub
FROM node:9

# Create a directory where our app will be placed


# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install
RUN npm install -g nodemon


# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["npm", "start"]