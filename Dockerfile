FROM node:18

WORKDIR /crypto

ADD ../ /crypto

RUN yarn install

CMD [ "/bin/bash" ]