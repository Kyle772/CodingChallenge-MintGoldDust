# Stage 1 - react base
FROM node:14-alpine3.10 as node-base
RUN apk update && apk add yarn\
  npm \
  python \
  make \
  g++

# Stage 1 - react build
FROM node-base as react-build
WORKDIR /home/web
COPY ./web/package.json .
COPY ./web/src ./src
COPY ./web/public ./public
RUN npm install
RUN npm run build

# Stage 3 - the production environment
FROM nginx:alpine
COPY --from=react-build ./home/web/build /var/www/kylediggs.com/html 
COPY --from=react-build ./home/web/build /var/www/localhost/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]