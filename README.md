# Task Manager

A full-stack learning project built to develop hands-on experience with **TypeScript, Node.js, Express, PostgreSQL, Prisma, Clean Architecture, Dependency Injection, automated testing, and React**.

The project is being developed incrementally, with the backend first and a React frontend planned as the next stage.

> **Status:** Backend CRUD API implemented. Unit testing implemented. Integration testing is in progress. React frontend is planned as the next major stage.

---

## 🎯 Project Goals

The main goal of this project is to gain practical experience building a modern TypeScript/Node.js application using engineering practices familiar from enterprise .NET development.

The project focuses on:

- TypeScript development
- Node.js backend development
- REST API design
- Clean Architecture
- Physical package boundaries
- Dependency Injection
- PostgreSQL persistence
- Prisma ORM
- API validation and error handling
- Unit and integration testing
- React + TypeScript frontend development
- Reproducible local development environments

---

## 🛠️ Technology Stack

### Backend

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma**
- **PostgreSQL**
- **tsyringe** — Dependency Injection
- **Docker Compose** — PostgreSQL development environment

### Testing

- **Vitest**
- Unit tests for Application services
- Integration tests for Infrastructure components
- PostgreSQL test database

### Frontend

- **React**
- **TypeScript**

> The React frontend will be added in a later stage of the project.

### Development

- npm workspaces
- TypeScript project references
- VS Code
- Git / GitHub
- Docker Compose

---

## 🏗️ Architecture

The backend follows a **Clean Architecture-inspired layered structure** with physical package boundaries.

```text
                         ┌─────────────────────┐
                         │     Presentation    │
                         │                     │
                         │ Express / Controllers
                         │ DTOs / Middleware   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Application     │
                         │                     │
                         │ Services            │
                         │ Interfaces / Ports  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Domain        │
                         │                     │
                         │ Entities            │
                         │ Business concepts   │
                         └─────────────────────┘
                                    ▲
                                    │
                         ┌──────────┴──────────┐
                         │   Infrastructure    │
                         │                     │
                         │ Prisma / PostgreSQL │
                         │ Repositories        │
                         │ Logging             │
                         └─────────────────────┘
```

### Dependency Direction

```text
Domain
   ↑
Application
   ↑
Infrastructure

Presentation
   ├── Application
   ├── Infrastructure
   └── Domain
```

The important architectural principle is that **business/application code does not depend on infrastructure implementations**.

For example:

```text
Application
    │
    └── ITaskRepository
             ▲
             │ implements
             │
Infrastructure
    └── TaskRepository
             │
             ▼
          Prisma
             │
             ▼
        PostgreSQL
```

This makes infrastructure replaceable and allows the Application layer to be tested independently.

---

## 📁 Project Structure

```text
task-manager/
│
├── docker/
│   └── postgres/
│       └── init/
│           └── 01-create-databases.sql
│
├── packages/
│   │
│   ├── domain/
│   │   ├── src/
│   │   │   ├── entities/
│   │   │   │   └── Task.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── application/
│   │   ├── src/
│   │   │   ├── ports/
│   │   │   │   ├── ILogger.ts
│   │   │   │   └── ITaskRepository.ts
│   │   │   ├── services/
│   │   │   │   └── TaskService.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── infrastructure/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── database/
│   │   │   ├── generated/
│   │   │   ├── logging/
│   │   │   ├── mappers/
│   │   │   └── repositories/
│   │   ├── tests/
│   │   │   └── setup.ts
│   │   └── package.json
│   │
│   └── presentation/
│       ├── src/
│       │   ├── containers/
│       │   ├── controllers/
│       │   ├── dtos/
│       │   ├── mappers/
│       │   ├── middlewares/
│       │   ├── validators/
│       │   └── app.ts
│       └── package.json
│
├── .env.example
├── .env.test.example
├── docker-compose.yml
├── package.json
├── prisma.config.ts
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

Local `.env` and `.env.test` files are intentionally not committed to Git.

---

## 🔌 REST API

The current backend exposes the following endpoints:

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/health`    | Health check  |
| GET    | `/api/tasks`     | Get all tasks |
| GET    | `/api/tasks/:id` | Get a task    |
| POST   | `/api/tasks`     | Create a task |
| PUT    | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example Task

```json
{
  "id": 1,
  "title": "Learn TypeScript",
  "completed": false
}
```

---

## 💉 Dependency Injection

The application uses **tsyringe** for Dependency Injection.

The Application layer defines abstractions:

```typescript
interface ITaskRepository {
  getTasks(): Promise<Task[]>;
  getTaskById(id: number): Promise<Task | null>;
  createTask(title: string): Promise<Task>;
  updateTask(
    id: number,
    title: string,
    completed: boolean,
  ): Promise<Task | null>;
  deleteTask(id: number): Promise<boolean>;
}
```

Infrastructure provides the implementation:

```text
ITaskRepository
       ▲
       │
TaskRepository
       │
       ▼
    Prisma
```

The dependency is registered in the Presentation composition root:

```typescript
container.register("ITaskRepository", {
  useClass: TaskRepository,
});
```

This keeps the Application layer independent from Prisma and PostgreSQL.

---

## 🗄️ Data Access

PostgreSQL is used as the database and Prisma is used for persistence.

```text
PostgreSQL
     ▲
     │
   Prisma
     ▲
     │
TaskRepository
     ▲
     │
ITaskRepository
     ▲
     │
 TaskService
```

Prisma-specific models are kept inside Infrastructure.

A mapper converts persistence models into Domain entities:

```text
Prisma Task
     │
     ▼
TaskMapper
     │
     ▼
Domain Task
```

This prevents persistence-specific types from leaking into the Application or Domain layers.

---

## 🐳 PostgreSQL Development Environment

PostgreSQL runs through Docker Compose.

```text
docker compose up -d
        │
        ▼
PostgreSQL
    │       │
    ▼       ▼
taskmanager  taskmanager_test
```

The Docker initialization script is responsible for **creating the databases**.

Application tables are created by **Prisma migrations**.

This keeps infrastructure setup separate from application schema management.

### Database responsibilities

```text
Docker Compose
    │
    └── PostgreSQL
          ├── taskmanager
          └── taskmanager_test

Prisma migrations
    │
    ├── Development schema
    │      └── taskmanager
    │
    └── Test schema
           └── taskmanager_test
```

The same Prisma migration history is applied independently to both databases.

---

## 🔐 Environment Configuration

Development uses `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/taskmanager?schema=public"
```

Testing uses `.env.test`:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/taskmanager_test?schema=public"
```

Example files are committed to the repository:

```text
.env.example
.env.test.example
```

Actual environment files are local and should not be committed:

```text
.env
.env.test
```

---

## 🔄 Database Migration Workflow

Database migrations are deliberately **explicit**.

### Development database

```bash
npm run db:migrate
```

This applies pending Prisma migrations to:

```text
taskmanager
```

### Test database

```bash
npm run db:migrate:test
```

This applies pending Prisma migrations to:

```text
taskmanager_test
```

### Why migrations are explicit

Running tests does **not** automatically migrate the test database.

This gives the developer control over when a new schema change becomes available for testing.

For example:

```text
Developer creates migration
        │
        ▼
Development database
        │
        ▼
Developer verifies feature
        │
        ▼
Developer decides migration is ready
        │
        ▼
Test database migration
        │
        ▼
Integration tests
```

This prevents an unfinished database change from being silently applied to the test environment.

---

## 🔄 Request Flow

A typical request follows this flow:

```text
HTTP Request
     │
     ▼
Express
     │
     ▼
Validation Middleware
     │
     ▼
Controller
     │
     ▼
TaskService
     │
     ▼
ITaskRepository
     │
     ▼
TaskRepository
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
```

The response follows the reverse direction:

```text
PostgreSQL
     │
     ▼
Prisma
     │
     ▼
TaskRepository
     │
     ▼
Domain Task
     │
     ▼
TaskResponseMapper
     │
     ▼
Response DTO
     │
     ▼
HTTP Response
```

---

## 🚀 Getting Started

### Prerequisites

Install:

- Node.js
- npm
- Docker Desktop
- Git

---

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-manager
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment files

Create the development environment file from the example:

```powershell
Copy-Item .env.example .env
```

Create the test environment file:

```powershell
Copy-Item .env.test.example .env.test
```

Review the connection settings if necessary.

---

### 4. Start PostgreSQL

Start the Docker environment:

```bash
docker compose up -d
```

This creates the PostgreSQL container and, on a fresh database volume:

- `taskmanager`
- `taskmanager_test`

---

### 5. Initialize database schemas

Run:

```bash
npm run setup
```

This applies the current Prisma migrations to both:

- Development database
- Test database

The setup command is equivalent to:

```bash
npm run db:migrate
npm run db:migrate:test
```

---

### 6. Build the project

```bash
npm run build
```

---

### 7. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/api/health
```

---

## 🧪 Testing

The project uses **Vitest** for automated testing.

Testing is organized according to architectural boundaries.

```text
Application
    │
    └── Unit Tests
          │
          └── Test doubles / mock repository

Infrastructure
    │
    └── Integration Tests
          │
          └── Real Prisma + PostgreSQL

Presentation
    │
    └── API Tests
          │
          └── HTTP requests
```

### Unit tests

Application services can be tested without PostgreSQL.

For example:

```text
TaskService
    │
    └── Mock ITaskRepository
```

This keeps unit tests fast and focused on application behavior.

### Integration tests

Infrastructure components are tested using the real database:

```text
TaskRepository
      │
      ▼
Prisma
      │
      ▼
PostgreSQL
      │
      ▼
taskmanager_test
```

The test database is deliberately separate from the development database.

### Running tests

```bash
npm test
```

Tests do **not** automatically apply database migrations.

If a new database migration needs to be tested, explicitly run:

```bash
npm run db:migrate:test
```

before running the tests.

---

## 📋 Development Roadmap

### Backend

- [x] TypeScript project setup
- [x] Node.js + Express setup
- [x] PostgreSQL setup
- [x] Docker Compose PostgreSQL environment
- [x] Prisma integration
- [x] Prisma migrations
- [x] Separate development and test databases
- [x] Reproducible database setup
- [x] Clean Architecture package boundaries
- [x] Domain entity
- [x] Application service
- [x] Repository abstraction
- [x] Prisma repository implementation
- [x] Dependency Injection
- [x] DTOs
- [x] Request validation
- [x] Error handling
- [x] CRUD REST API
- [x] Unit tests
- [ ] Integration tests
- [ ] API tests
- [ ] Authentication / authorization

### Frontend

- [ ] React + TypeScript setup
- [ ] Task list
- [ ] Create task
- [ ] Edit task
- [ ] Complete/uncomplete task
- [ ] Delete task
- [ ] API client
- [ ] Loading and error states
- [ ] Responsive UI

### Future Improvements

- [ ] Docker Compose for the complete application
- [ ] CI/CD with GitHub Actions
- [ ] API documentation
- [ ] Structured logging
- [ ] Production configuration
- [ ] Deployment

---

## 🎓 What This Project Demonstrates

This project is primarily a hands-on learning project, but it is designed using patterns commonly found in enterprise software development.

It demonstrates practical experience with:

- **TypeScript**
- **Node.js**
- **Express**
- **REST APIs**
- **PostgreSQL**
- **Prisma**
- **Docker**
- **Dependency Injection**
- **Clean Architecture**
- **SOLID principles**
- **Repository pattern**
- **DTOs and mapping**
- **Separation of concerns**
- **API validation**
- **Error handling**
- **Unit testing**
- **Integration testing**
- **React + TypeScript** as the frontend evolves

---

## 🔭 Project Direction

The project will continue evolving from a backend-focused TypeScript application into a complete full-stack application:

```text
                  ┌──────────────────────┐
                  │     React + TS       │
                  │      Frontend        │
                  └──────────┬───────────┘
                             │
                             │ HTTP / REST
                             ▼
                  ┌──────────────────────┐
                  │  Node.js + Express   │
                  │       Backend        │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │  Clean Architecture │
                  │                      │
                  │ Domain               │
                  │ Application          │
                  │ Infrastructure       │
                  │ Presentation         │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ PostgreSQL + Prisma  │
                  └──────────────────────┘
```

The goal is not simply to build a task manager, but to use the project as a practical environment for learning and demonstrating **modern TypeScript/Node.js full-stack development and enterprise software engineering practices**.
