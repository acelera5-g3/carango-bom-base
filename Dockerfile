#### Stage 1: Build the react application
FROM node:slim as build

# Configure the main working directory inside the docker image.
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
WORKDIR /web

# Copy the package.json as well as the package-lock.json and install
# the dependencies. This is a separate step so the dependencies
# will be cached unless changes to one of those two files are made.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the main application
COPY . ./

# Arguments
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ARG API_BASE
ENV API_BASE=${API_BASE}

# Build the application
RUN npm run build

#### Stage 2: Serve the React application from node serve
FROM node:slim

# Copy the react build from Stage 1
COPY --from=build /web/build /var/www/dist

RUN npm install -g serve

ARG PORT
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD serve -p ${PORT} -s /var/www/dist
