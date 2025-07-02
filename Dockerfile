# Étape 1 : Builder l'app Angular SSR
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev incluses pour le build)
RUN npm ci

# Copier le code source
COPY . .

# Build de l'application Angular avec SSR
RUN npm run build

# Étape 2 : Conteneur final pour exécuter l'app
FROM node:20-alpine

WORKDIR /app

# Copier les fichiers buildés
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .

# Installer seulement les dépendances de production
RUN npm ci --omit=dev

EXPOSE 4000

# Lancer le server SSR
CMD ["npm", "run", "serve:ssr:frontend"]