FROM node:18.3.0 AS production
ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
COPY ./src/public ./dist/public
COPY ./src/views ./dist/views

CMD ["npm", "run", "start:prod"]