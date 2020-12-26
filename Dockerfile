FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000

## THE LIFE SAVER
#ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
#RUN chmod +x /wait

CMD [ "npm", "start" ]