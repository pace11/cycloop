FROM node:20.19.3-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

COPY .env .env

RUN npm run build

EXPOSE 4100
CMD ["npm", "run", "start"]
