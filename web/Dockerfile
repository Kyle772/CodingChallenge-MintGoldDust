FROM node:14-alpine3.10
RUN apk update && apk add yarn \
  python \
  make \
  g++
WORKDIR /home/web
COPY ./package.json ./package.json
RUN yarn cache clean
RUN yarn
EXPOSE 3002
CMD ["yarn", "dev"]