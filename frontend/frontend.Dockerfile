# syntax=docker/dockerfile:1.3-labs
FROM node:21.0.0

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 5173
CMD ["npm", "run", "start"]