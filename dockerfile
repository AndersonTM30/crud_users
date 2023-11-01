   FROM node:lts-slim as package

   WORKDIR /app
   RUN apt update
   RUN apt install procps -y

   COPY package*.json ./
   COPY *.lock ./
   COPY prisma ./prisma/
   COPY tsconfig.json ./
   RUN npm install

   FROM package as build

   COPY src ./src
   COPY nest-cli.json ./
   COPY tsconfig.json ./
   RUN npm run build

   FROM package as dev
   ENV NODE_ENV=development

   EXPOSE 3000
   CMD ["npm", "run","start:dev"]

   FROM build as prod
   ENV NODE_ENV=production
   EXPOSE 3000
   CMD ["npm", "run","start:prod"]
