FROM node:24-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN if [ -f tsconfig.json ]; then npm run build; fi
CMD [ "node", "main.js", "watch" ]