# Étape 1 : Build Angular SSR
FROM node:20-alpine AS builder

WORKDIR /app

# Copy packages
COPY package*.json ./

# install all 
RUN npm ci

# copy source code
COPY . .

# Build 
RUN npm run build

# final container to execute tyhe app
FROM node:20-alpine

WORKDIR /app

# Cipy builed files
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .

# Install prod
RUN npm ci --omit=dev

EXPOSE 4000

# LAUNCH !
CMD ["npm", "run", "serve:ssr:frontend"]