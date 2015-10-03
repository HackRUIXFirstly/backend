#
# Firstly dockerfile
#

# Pull base image
FROM node
MAINTAINER Matthew Lavine <matt@matthewlavine.net>

COPY . /src

RUN cd /src; npm install -g bower; npm install; bower --allow-root install

EXPOSE 80

CMD ["node", "/src/bin/www"]