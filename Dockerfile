# Stage 1: Build the React app
FROM node:16.4 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built app
FROM node:16.4

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
COPY vite.config.ts ./
RUN npm install typescript

EXPOSE 5173

CMD ["npm", "run", "preview"]