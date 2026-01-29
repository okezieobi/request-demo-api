# request-demo-api

A RESTful User Management API built with Express, TypeScript, and MongoDB. This project is a take home assessment demonstrating clean architecture principles, proper error handling, and data validation.

## Overview

This API provides comprehensive user management capabilities including creating, reading, updating, deleting, and listing users with pagination support.

## Features

- **User Management**: Full CRUD operations for user entities
- **Pagination**: List users with skip and limit support
- **Data Validation**: Input validation using Zod schema validation
- **Error Handling**: Comprehensive error handling with Zod error support
- **MongoDB Integration**: Persistent data storage with MongoDB
- **TypeScript**: Full type safety throughout the application
- **Development Tools**: ESLint, Prettier, Husky for code quality
- **Docker Support**: Containerized with Docker and Docker Compose

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5.x
- **Language**: TypeScript
- **Database**: MongoDB
- **Validation**: Zod
- **Logging**: Morgan (HTTP request logger)
- **Development**: Nodemon for hot-reload, TSNode for TypeScript execution

## API Endpoints

- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users` - List users with pagination
- `GET /api/v1/users/:id` - Get a specific user
- `PUT /api/v1/users/:id` - Update a user
- `DELETE /api/v1/users/:id` - Delete a user

See the [Postman documentation](https://documenter.getpostman.com/view/37684547/2sBXVo8nqA) for detailed API specifications.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Docker (optional)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory or copy from `.env.example`:

```bash
cp .env.example .env
```

**Required Environment Variables:**

- `PORT` - Server port (default: `3000`)
- `MONGODB_URI` - MongoDB connection string (default: `mongodb://root:example@localhost:27017`)
- `MONGODB_DB` - MongoDB database name (default: `request-demo`)

Example `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://root:example@localhost:27017
MONGODB_DB=request-demo
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Docker

```bash
docker-compose up
```

## Project Structure

- `src/app.ts` - Express application setup
- `src/domain/` - Domain models (business logic entities)
- `src/infra/` - Infrastructure layer (MongoDB client, collections, services)
- `src/interfaces/` - External interfaces (HTTP routes, DTOs)
- `src/services/` - Service abstractions
- `src/mappers/` - Domain to DTO mapping
