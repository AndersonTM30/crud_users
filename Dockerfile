FROM node:lts-slim as package

WORKDIR /app
RUN apt update
RUN apt install procps -y
RUN apt install openssl -y
RUN npm install -g prisma

COPY package*.json .
COPY *.lock .
COPY nest-cli.json .
COPY prisma ./prisma/
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY .env ./
RUN npm install

RUN npx prisma generate
# RUN npx prisma migrate deploy

FROM package as build

COPY src ./src
COPY nest-cli.json .
COPY tsconfig.build.json .
COPY tsconfig.json .
RUN npm run build

FROM build as dev
ENV NODE_ENV=development

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && npm run start:dev"
# CMD ["npm", "run", "start:prod"]

FROM build as prod
ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
