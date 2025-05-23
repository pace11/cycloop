FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

COPY .env .env

RUN npm run build

EXPOSE 4100
CMD ["npm", "run", "start"]
