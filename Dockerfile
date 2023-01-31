FROM node:18

WORKDIR /

RUN git clone https://github.com/arensusu/Crypto.git

WORKDIR /Crypto/backend
RUN yarn install

WORKDIR /Crypto/frontend
RUN yarn install

WORKDIR /Crypto
CMD [ "/bin/bash" ]