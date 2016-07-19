FROM node:slim

ADD . /gla-angular
RUN cd /gla-sails; npm install -g bower gulp; npm install

WORKDIR /gla-sails

EXPOSE 3000

CMD ["gulp", "serve"]
