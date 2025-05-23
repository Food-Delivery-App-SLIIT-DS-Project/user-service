# === Build Stage ===
FROM node:22-alpine AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy rest of app
COPY . .
RUN npm run build

# === Production Stage ===
FROM node:22-alpine AS prod

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Copy generated Prisma client files
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma  
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# App code and config
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/.env ./.env

RUN npm cache clean --force

EXPOSE 50052
CMD ["npm", "run", "start:prod"]
