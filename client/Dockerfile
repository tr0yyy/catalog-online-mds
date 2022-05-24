FROM node:alpine
LABEL version="1.0"
LABEL description="Imagine Docker pentru serverul frontend"
LABEL maintainer="alexandru.nicoi@s.unibuc.ro"
WORKDIR /client
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install --legacy-peer-deps
EXPOSE 8081
CMD ["npm", "run", "start"]
