FROM node:18

WORKDIR /app

COPY ./src/package*.json ./
RUN npm install --force

COPY ./src ./src

EXPOSE 4002

CMD ["node", "src/server.js"]
