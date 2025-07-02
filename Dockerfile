# Étape 1 : Builder l'app Angular SSR
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build:ssr

# Étape 2 : Conteneur final pour exécuter l'app
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .

RUN npm install --omit=dev

EXPOSE 4000

CMD ["node", "dist/server/main.js"]
