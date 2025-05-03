FROM node:18

WORKDIR /app

COPY ./src/package*.json ./
RUN npm install --force

COPY ./src ./src

EXPOSE 4004

CMD ["node", "src/server.js"]
