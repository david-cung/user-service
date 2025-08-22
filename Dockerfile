FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy everything else
COPY . .

RUN echo "[⚙️ BUILDING...]" && npm run build

FROM node:20-alpine AS production


WORKDIR /app
COPY package*.json ./

ARG API_URL
ENV API_URL=${API_URL}

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3030 3001

CMD ["node", "dist/main.js"]