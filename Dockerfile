### STAGE 1: Build ###
FROM node:14.15 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm i
COPY . .

RUN npm run prerender
RUN cd /usr/src/app/dist/functions/browser

### STAGE 2: Run ###
FROM nginx AS final
### Do note the project name, as 'ng build or npm run build'
### will create the directory structure like this
### /dist/your-project-name
COPY --from=build /usr/src/app/dist/functions/browser /usr/share/nginx/html

# 覆蓋image裡的設定檔
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
