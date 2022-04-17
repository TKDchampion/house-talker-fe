### STAGE 1: Build ###
FROM node:14.15 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm i
COPY . .

RUN npm run build:ssr

### STAGE 2: Run ###
FROM node:14.15
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist

# CMD [ "node", "dist/house-talker-fe/server/main.js" ]
CMD ["npm", "run", "serve:ssr"]
