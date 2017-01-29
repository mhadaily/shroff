FROM node:7.4.0

RUN useradd --user-group --create-home --shell /bin/false shroff && \
    apt-get clean

ENV HOME=/home/shroff

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY . $HOME/app

RUN chown -R shroff:shroff $HOME/* /usr/local/

WORKDIR $HOME/app

RUN npm install nodemon --global --silent --progress=false --production

RUN npm cache clean && npm install --silent --progress=false --production

RUN chown -R shroff:shroff $HOME/*

USER shroff

ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["nodemon", "-L", "./app/bin/www"]
#CMD ["npm", "start"]
