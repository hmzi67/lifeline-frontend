# Lifeline Web Monorepo

Lifeline is a full-stack health and wellness platform with three separate apps in one repository:

- `api/` - Express + TypeScript backend with Prisma, JWT auth, file uploads, and health/progress endpoints.
- `client/` - Public React + Vite frontend for the main Lifeline experience.
- `admin/` - Separate React + Vite admin panel for managing content and platform data.

## Overview

The backend exposes JSON APIs under the `/api` prefix, while both frontends consume those endpoints through `VITE_API_URL` or same-origin `/api` in production. The deployment setup uses PM2 to serve the built client and admin apps and to run the API server.

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Zustand, Axios, React Router
- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL, Passport, JWT, Winston
- Deployment: PM2, CloudPanel, NGINX, static `dist/` builds for the frontends

## Features

### Public Client

- Authentication and account flows
- Landing pages and marketing pages
- Blog reading and content pages
- Questionnaire flows for onboarding
- Nutrition, exercise, meditation, sleep, fasting, and water tracking views
- Payments and subscription-related UI

### Admin Panel

- Content management for blogs, exercises, diet plans, meditation, and other platform data
- User and role management
- Referral and coupon tools
- Dashboard-style admin workflows

### API

- Auth endpoints with login, signup, logout, refresh, verification, and social auth
- Progress, diet, exercise, challenge, sleep, water, fasting, meditation, and medication APIs
- Prisma-backed database access
- Session persistence via Prisma session store

## Repository Structure

```text
.
├── api/        # Express API
├── client/     # Public frontend
├── admin/      # Admin frontend
├── ecosystem.config.cjs
├── DEPLOYMENT_STEPS.md
├── API_FIELD_VERIFICATION.md
└── http-test/
```

## Prerequisites

- Node.js 18 or newer
- npm
- PostgreSQL for the API
- Environment variables for each app

## Installation

Install dependencies from the root and each app folder:

```bash
npm install
cd api && npm install
cd ../client && npm install
cd ../admin && npm install
```

If you want a one-shot workspace install from the root, use:

```bash
npm run install-all
```

## Running Locally

### API

```bash
cd api
npm run dev
```

The API runs on port `3000` by default and serves routes under `/api/*`.

### Client

```bash
cd client
npm run dev
```

### Admin

```bash
cd admin
npm run dev
```

## Root Scripts

From the repository root:

- `npm run dev` - Start the API and client together
- `npm run server` - Start only the API
- `npm run client` - Start only the public frontend
- `npm run build` - Build the client frontend
- `npm run start` - Start the API production server
- `npm run install-all` - Install dependencies for root, API, client, and admin

## App Scripts

### `api/`

- `npm run dev` - Start the API in watch mode
- `npm run build` - Type-check and compile to `dist/`
- `npm run start` - Run the compiled server from `dist/server.js`
- `npm run migrate` - Run Prisma migrations
- `npm run generate` - Generate Prisma client
- `npm run studio` - Open Prisma Studio

### `client/`

- `npm run dev` - Start the Vite dev server
- `npm run build` - Type-check and build production assets
- `npm run preview` - Preview the production build
- `npm run test` - Run Vitest

### `admin/`

- `npm run dev` - Start the Vite dev server
- `npm run build` - Build production assets
- `npm run build:check` - Type-check and build
- `npm run preview` - Preview the production build

## Environment Variables

### API (`api/.env`)

Key variables used by the backend include:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `SESSION_SECRET`
- `CORS_ORIGIN`
- `PORT`
- `HOST`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `UPLOAD_PATH`

### Client (`client/.env`)

- `VITE_API_URL` - Backend base URL, usually `https://your-domain.com/api` in production
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key for payment flows

### Admin (`admin/.env`)

- `VITE_API_URL` - Backend base URL, usually `https://your-domain.com/api` in production
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key if admin payment flows need it

If `VITE_API_URL` is not provided, both frontends fall back to same-origin `/api` in production and `http://localhost:3000/api` in development.

## Production Deployment

The repo is set up to be deployed with PM2 using [ecosystem.config.cjs](ecosystem.config.cjs).

Typical flow:

```bash
cd api && npm run build
cd ../client && npm run build
cd ../admin && npm run build
cd ..
pm2 start ecosystem.config.cjs
pm2 save
```

The ecosystem file serves:

- `lifeline-api` from `api/dist/server.js`
- `lifeline-client` from `client/dist`
- `lifeline-admin` from `admin/dist`

## Deployment Notes

- The API routes are mounted under `/api`, so frontend API URLs should include that prefix when pointing to a separate host.
- In production, the frontends should not fall back to localhost.
- If you change any environment variables for the frontends, rebuild before redeploying because Vite bakes them into the bundle.
- The API uses Prisma, so run `npm run generate` after dependency or schema changes if needed.

See [DEPLOYMENT_STEPS.md](DEPLOYMENT_STEPS.md) for the existing CloudPanel and VPS deployment checklist.

## Useful Reference Files

- [DEPLOYMENT_STEPS.md](DEPLOYMENT_STEPS.md)
- [API_FIELD_VERIFICATION.md](API_FIELD_VERIFICATION.md)
- [http-test/API_Test.http](http-test/API_Test.http)

## Troubleshooting

- If the API fails on startup, run `cd api && npm install` to ensure runtime dependencies are installed, then rebuild.
- If the frontend cannot reach the backend, confirm `VITE_API_URL` points to the deployed API and that the backend allows the frontend origin in CORS.
- If a production change does not appear, rebuild the affected Vite app and redeploy the resulting `dist/` folder.
