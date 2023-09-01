FROM --platform=linux/amd64 node:19-alpine as development

WORKDIR /usr/src/app

ENV NODE_ENV=development


COPY package*.json ./

RUN npm install webpack glob rimraf --legacy-peer-deps

RUN npm install --only=development --legacy-peer-deps

COPY . .

RUN npm run build

FROM --platform=linux/amd64 node:19-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --legacy-peer-deps

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]