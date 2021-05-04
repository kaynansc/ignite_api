FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 333

CMD ["npm", "run", "dev"]