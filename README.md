# LogIQ

AI-powered GitHub Actions workflow failure analyzer built with TypeScript, Express, BullMQ, PostgreSQL, Prisma, Ollama, and React.

LogIQ automatically detects completed GitHub Actions workflow runs, downloads workflow logs, analyzes failures using a local Large Language Model (Llama 3.2 via Ollama), stores AI-generated insights in PostgreSQL, and presents the results through a modern React dashboard.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Application Workflow](#application-workflow)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

# Project Overview

Debugging failed GitHub Actions workflows often requires manually inspecting hundreds or thousands of log lines before identifying the actual failure.

LogIQ automates this workflow by processing GitHub Actions logs immediately after a workflow completes.

The application:

- Receives GitHub webhook events
- Downloads workflow logs using the GitHub Actions API
- Extracts and merges workflow log files
- Sends merged logs to Ollama (Llama 3.2)
- Generates AI-powered failure explanations
- Stores analyses in PostgreSQL
- Displays workflow history and AI insights through a React dashboard

The objective is to reduce the time required to diagnose CI/CD failures by transforming raw workflow logs into structured, readable analyses.

---

# Features

## GitHub Integration

- GitHub Webhook listener
- GitHub Actions REST API integration
- Automatic workflow log download
- Workflow status tracking

## AI Log Analysis

- Ollama integration
- Llama 3.2 local language model
- Root cause identification
- Failure explanation
- Suggested fixes

## Backend

- Express.js REST API
- TypeScript
- BullMQ background workers
- Redis job queue
- Prisma ORM
- PostgreSQL

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Responsive dashboard
- Workflow search and filtering

---

# Project Structure

```text
LogIQ
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── queues/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── workers/
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Installation

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL
- Redis
- Ollama
- GitHub Personal Access Token

---

## Clone the Repository

```bash
git clone https://github.com/chethanac15/LogIQ.git

cd LogIQ
```

---

## Install Backend Dependencies

```bash
npm install
```

---

## Install Frontend Dependencies

```bash
cd frontend

npm install
```

---

# Configuration

Create a `.env` file in the project root.

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/logiq

GITHUB_TOKEN=your_github_personal_access_token

WEBHOOK_SECRET=your_webhook_secret

OLLAMA_URL=http://localhost:11434

REDIS_HOST=127.0.0.1

REDIS_PORT=6379
```

---

# Running the Application

## Start PostgreSQL and Redis

```bash
docker compose up -d
```

---

## Start Ollama

```bash
ollama serve
```

Pull the required model if it has not already been installed.

```bash
ollama pull llama3.2
```

---

## Start the Backend

```bash
npm run dev
```

---

## Start the Worker

```bash
npm run worker
```

---

## Start the Frontend

```bash
cd frontend

npm run dev
```

The dashboard will be available at:

```
http://localhost:5173
```

---

# API Endpoints

## Health Check

```http
GET /health
```

Returns the backend and database status.

---

## Get All Workflow Analyses

```http
GET /analysis
```

Returns every stored workflow analysis ordered by creation date.

---

## Get Workflow Analysis

```http
GET /analysis/:runId
```

Returns the analysis associated with a specific workflow run.

---

## GitHub Webhook

```http
POST /webhook
```

Receives GitHub Actions webhook events and queues workflow processing.

---

# Application Workflow

```
GitHub Actions Workflow
            │
            ▼
GitHub Webhook
            │
            ▼
Express Backend
            │
            ▼
BullMQ Queue
            │
            ▼
Redis
            │
            ▼
Background Worker
            │
            ▼
Download Workflow Logs
            │
            ▼
Extract ZIP Archive
            │
            ▼
Merge Log Files
            │
            ▼
Ollama (Llama 3.2)
            │
            ▼
AI Workflow Analysis
            │
            ▼
PostgreSQL
            │
            ▼
React Dashboard
```

---

# Architecture

The application consists of four primary components.

### Backend

Receives webhook events, exposes REST APIs, and manages workflow processing.

### Worker

Processes queued jobs, downloads workflow logs, performs AI analysis, and stores results.

### Database

Persists workflow metadata and AI-generated analyses using PostgreSQL and Prisma.

### Frontend

Provides a dashboard for viewing workflow history, searching repositories, filtering workflow runs, and inspecting detailed AI analyses.

---

# Demo Video
Watch the application in action
https://youtu.be/U8s0xir8pLc

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# License

This project is licensed under the MIT License.
