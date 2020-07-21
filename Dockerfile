FROM node:14.4.0-alpine
WORKDIR /app
COPY app/package.json .
RUN npm install
RUN npm i -g nodemon
CMD [ "nodemon" ]
