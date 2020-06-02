FROM node:v12.13.1
RUN Mkdir -p /srv/app/client
WORKDIR /srv/app/client
COPY package.json /srv/app/client
COPY package-lock.json /srv/app/client
RUN npm install
COPY . /srv/app/client
CMD ["npm", "start"]