# Task Manager

A full-stack learning project built to develop hands-on experience with **TypeScript, Node.js, Express, PostgreSQL, Prisma, Clean Architecture, Dependency Injection, and React**.

The project is being developed incrementally, with the backend first and a React frontend planned as the next stage.

> **Status:** Backend CRUD API implemented. Automated testing and React frontend are planned/in progress.

---

## 🎯 Project Goals

The main goal of this project is to gain practical experience building a modern TypeScript/Node.js application using engineering practices familiar from enterprise .NET development.

The project focuses on:

- TypeScript development
- Node.js backend development
- REST API design
- Clean Architecture
- Dependency Injection
- PostgreSQL persistence
- Prisma ORM
- API validation and error handling
- Automated testing
- React + TypeScript frontend development

---

## 🛠️ Technology Stack

### Backend

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma**
- **PostgreSQL**
- **tsyringe** — Dependency Injection
- **Docker** — PostgreSQL development environment

### Frontend

- **React**
- **TypeScript**

> The React frontend will be added in a later stage of the project.

### Development

- npm workspaces
- TypeScript project references
- VS Code
- Git / GitHub

---

## 🏗️ Architecture

The backend follows a **Clean Architecture-inspired layered structure** with physical package boundaries.

```text
                         ┌─────────────────────┐
                         │     Presentation    │
                         │                     │
                         │ Express / Controllers│
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
├── prisma.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔌 REST API

The current backend exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
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
        completed: boolean
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
    useClass: TaskRepository
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
- Docker
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

### 3. Start PostgreSQL

The project uses PostgreSQL in Docker.

Example:

```bash
docker start mypostres
```

If the container does not exist yet, create a PostgreSQL container appropriate for your local environment.

---

### 4. Configure the database

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:<password>@127.0.0.1:5432/taskmanager"
```

Do not commit `.env` to Git.

---

### 5. Run Prisma migrations

```bash
npx prisma migrate dev
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

Automated tests are part of the planned development roadmap.

The intended testing strategy is:

```text
Application
    │
    └── Unit Tests
          │
          └── Mock ITaskRepository

Infrastructure
    │
    └── Integration Tests
          │
          └── PostgreSQL / Prisma

Presentation
    │
    └── API Tests
          │
          └── HTTP requests
```

This allows each layer to be tested at the appropriate level.

---

## 📋 Development Roadmap

### Backend

- [x] TypeScript project setup
- [x] Node.js + Express setup
- [x] PostgreSQL setup
- [x] Prisma integration
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
- [ ] Automated unit tests
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
- **Dependency Injection**
- **Clean Architecture**
- **SOLID principles**
- **Repository pattern**
- **DTOs and mapping**
- **Separation of concerns**
- **API validation**
- **Error handling**
- **Automated testing**
- **React + TypeScript** *(as the frontend evolves)*

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
                  │   Clean Architecture │
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

The goal is not simply to build a task manager, but to use the project as a practical environment for learning and demonstrating **modern TypeScript/Node.js full-stack development**.