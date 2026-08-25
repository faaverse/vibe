# Vibe Backend API

A high-performance backend template using Bun, ElysiaJS, Drizzle ORM, and MySQL.

## Setup Instructions

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your connection details:
   ```bash
   cp .env.example .env
   ```

3. **Database Migrations**:
   - Generate migration files:
     ```bash
     bun run db:generate
     ```
   - Run migrations to update the database:
     ```bash
     bun run db:migrate
     ```
   - Alternatively, push schema changes directly (for prototyping):
     ```bash
     bun run db:push
     ```

4. **Run Development Server**:
   ```bash
   bun run dev
   ```
