FROM node:v12.13.1
RUN Mkdir -p /srv/app/server
WORKDIR /srv/app/server
COPY package.json /srv/app/server
COPY package-lock.json /srv/app/server
RUN npm install
COPY . /srv/app/server
CMD ["npm", "run", "dev"]