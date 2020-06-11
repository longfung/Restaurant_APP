FROM node:12.13.1
RUN mkdir -p /srv/app/server
WORKDIR /srv/app/server 
COPY package.json /srv/app/server 
COPY package-lock.json /srv/app/server 
RUN npm install -f
COPY ./server /srv/app/server
ENV DATABASE_URL postgres://postgres:Welcome1@pgdb:5432/restaurant-db
EXPOSE 8080
CMD ["npm", "run", "server"]