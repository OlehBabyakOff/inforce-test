# Inforce Test Project

## Overview

This is a Node.js/TypeScript backend application built with Express.js, implementing authentication, user management, and book management features.

## Tech Stack

- **Runtime**: Node.js (v22)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (cloud-hosted via MongoDB Atlas)
- **Cache**: Redis (cloud-hosted via Redis Cloud)
- **Authentication**: JWT (access and refresh tokens)
- **Validation**: Joi
- **Logging**: Pino
- **Containerization**: Docker (multi-stage build)
- **Package Manager**: pnpm

## Project Structure

- `src/app.ts`: Express application configuration and global middleware setup
- `src/server.ts`: Server entry point and startup logic
- `src/controllers/`: Route handlers for auth, users, and books
- `src/services/`: Business logic layer
- `src/repositories/`: Data access layer with MongoDB integration
- `src/models/`: Mongoose models and interfaces
- `src/middlewares/`: Express middlewares (auth, error handling, logging)
- `src/infrastructure/`: External service clients (JWT, MongoDB, Redis, Logger)
- `src/schemas/`: Joi validation schemas
- `src/config/`: Environment configuration
- `src/constants/`: Application constants and error definitions

## Installation

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env` and configure environment variables

## Running the Application

### Development

```bash
pnpm run dev
```

### Production

```bash
pnpm run build
pnpm start
```

### Docker

```bash
# Development
docker build --target dev -t inforce-test:dev .
docker run -p 3000:3000 --env-file .env inforce-test:dev

# Production
docker build --target prod -t inforce-test:prod .
docker run -p 3000:3000 --env-file .env.prod inforce-test:prod
```

## API Endpoints

- **Auth**: `/auth/login`, `/auth/register`
- **Users**: `/users` (CRUD operations with caching)
- **Books**: `/books` (CRUD operations with caching)

## Development Notes

- Uses ESLint and Prettier for code quality
- TypeScript strict mode enabled
- Docker multi-stage build for optimized production images
- Pino logger with structured logging
- Redis caching for book and user operations

