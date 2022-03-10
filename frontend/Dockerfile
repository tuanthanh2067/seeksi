FROM node:16-alpine

ENV NODE_OPTIONS=--max_old_space_size=4096

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
