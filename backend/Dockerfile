FROM node:20.11-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV MONGO_URI=mongodb+srv://volkanekici13:vPgCvi1faDSB4Cje@mern-e-commerce.jjupzru.mongodb.net/mern-e-commerce
ENV CLIENT_DOMAIN=http://localhost:5173
ENV STRIPE_SECRET_KEY=sk_test_51PFvoqP9m3tLutlXRWQGOB8UFt6bpCYbxv3gVOvXPbY1QyJqADtzQPKgtokIKY9w1t9t9emOcmTBl51SC0EEpCf000gPnsUYWz

EXPOSE 3000

CMD ["npm", "start"]
