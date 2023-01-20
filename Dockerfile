FROM node:18

WORKDIR /crypto

ADD ../ /crypto

RUN yarn

CMD [ "/bin/bash" ]