FROM node

COPY . /tmp

WORKDIR /tmp

CMD npm install \
	&& node app.js
