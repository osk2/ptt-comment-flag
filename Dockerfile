FROM node:14-slim

WORKDIR /src
COPY . /src

ARG env=production

RUN yarn

WORKDIR /src
EXPOSE 9977
ENV NODE_ENV $env
CMD ["npm", "start"]
