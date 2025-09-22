FROM node:24-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install && npm run postinstall
COPY . .

RUN if [ -f tsconfig.json ]; then npm run build; fi
ENTRYPOINT [ "node", "main.js"]
CMD [ "watch" ]