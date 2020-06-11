FROM node:12.13.1
RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client
COPY package.json /srv/app/client
COPY package-lock.json /srv/app/client
RUN npm install --silent
COPY . /srv/app/client
EXPOSE 3000
CMD ["npm", "start"]
