FROM node:latest

ADD . /gla-angular
RUN cd /gla-angular; npm install -g bower; npm install -g gulp; npm install; bower install;

WORKDIR /gla-angular

EXPOSE 3000

CMD ["gulp", "serve"]
