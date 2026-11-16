# Agent Guide

## Project at a glance

LangCompass is a language and technology guide built as a Go API with a React
and TypeScript single-page app, which are under [Grit Framework](https://gritframework.dev/). The main application lives in
`src/web-frontend/`.

Before changing code, read the root `README.md` and, for application work,
`src/web-frontend/README.md`. Follow existing patterns in the relevant feature
or package; keep changes focused and update directly related documentation.

## Repository map

- `src/web-frontend/api/` — Go API (Gin, GORM), migrations, seeders, and tests.
- `src/web-frontend/api/internal/` — backend packages and application logic.
- `src/web-frontend/src/routes/` — file-based TanStack Router pages.
- `src/web-frontend/src/admin-panel/` — administration UI.
- `src/web-frontend/src/shared/` — frontend API types and Zod schemas.
- `src/web-frontend/packages/` — reusable packages, including the upload package.
- `src/web-frontend/public/` — static frontend assets.
- `k8s/` — Kubernetes deployment configuration.

TanStack Router generates `src/routeTree.gen.ts`; do not edit that file by hand.
Use the route-generation script or the build/type-check scripts when changing
routes.

## Local setup and development

Requirements: Node.js 22 or later, pnpm 10, and the Go version specified by
`src/web-frontend/api/go.mod`.

From `src/web-frontend/`:

1. Install frontend dependencies with `pnpm install`.
2. Create local environment configuration with `grit env` (or use the root
   `start-dev.bat` on Windows). Keep `.env` and other local secrets out of
   commits.
3. Run database migrations with `grit migrate`; use `grit seed` only when
   sample data is useful.
4. Run the full app with `grit start`. For separate servers, use `pnpm dev` for
   the frontend and `air` from `api/` for the Go API.

The default local database is SQLite; no database server is needed. The API
defaults to `http://localhost:8080` and the frontend to
`http://localhost:5173`.

## Validation

Run the relevant checks for the files changed:

- Frontend, from `src/web-frontend/`: `pnpm lint`, `pnpm type-check`, and
  `pnpm build`.
- Go API, from `src/web-frontend/api/`: `go vet ./...` and `go test -race ./...`.

The frontend build/type-check scripts generate routes before running TypeScript.
CI also checks API allocation budgets and handler benchmarks; consult
`.github/workflows/ci.yml` when changing those areas.

## Change guidelines

- Keep frontend types and validation schemas in `src/shared/` consistent with
  API request and response behavior.
- Add or update focused tests alongside changed Go behavior; run the applicable
  frontend checks when changing UI or shared types.
- Treat `.env*`, local SQLite databases, and `api/storage/` contents as
  machine-specific or user data. Never inspect, expose, or commit their
  contents; use `.env.example` for configuration names and safe placeholders.
- Preserve dependency constraints and security-version pins in
  `api/go.mod`; do not downgrade them as incidental cleanup.
- Do not commit generated build output, local logs, databases, or dependency
  directories. Check `git status` before finishing and leave unrelated user
  changes untouched.