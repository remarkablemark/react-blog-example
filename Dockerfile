FROM node:latest

WORKDIR /app

#RUN npm install -g contentful-cli

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

USER node
EXPOSE 3000

CMD ["npm", "run", "start"]
