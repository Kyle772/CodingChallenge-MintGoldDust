FROM strapi/strapi
RUN apt-get update && apt-get install -y yarn\
  nodejs \
  python \
  make \
  g++
RUN yarn cache clean
RUN yarn global add strapi
# Set up working dir
WORKDIR /srv/app
COPY ./package.json ./
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

# Running the app
EXPOSE 1337
CMD [ "strapi", "develop" ]