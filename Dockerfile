# Base stage
FROM node:22-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Build stage
FROM base AS build

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY tsconfig.json ./
COPY src ./src

RUN pnpm run build

# Dev stage
FROM base AS dev

ENV NODE_ENV=development

RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src

EXPOSE 3000

CMD [ "pnpm", "run", "dev" ]

# Prod stage
FROM base AS prod

ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/dist ./dist

# non root for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD [ "node", "dist/server.js" ]