FROM node:24-alpine
WORKDIR /app
COPY package*.json ./

COPY . .
RUN npm install && npm run postinstall

RUN if [ -f tsconfig.json ]; then npm run build; fi
ENTRYPOINT [ "node", "main.js"]
CMD [ "watch" ]