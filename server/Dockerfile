FROM node:alpine
LABEL version="1.0"
LABEL description="Imagine Docker pentru serverul backend"
LABEL maintainer="alexandru.nicoi@s.unibuc.ro"
WORKDIR /server
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install
EXPOSE 5000
CMD ["node", "server.js"]
