# Fibank Front-end Developer Task

This repository implements the supplied take-home assignment: a responsive React login form followed by a responsive data table populated from the Star Wars API.

## Requirements implemented

- Responsive login form with username and password fields
- Basic empty-field validation
- Login button disabled until both fields contain values
- React Router navigation to `/table`
- Protected `/table` route
- Star Wars API integration using `https://swapi.py4e.com/api/people/`
- Required fields: name, mass, height, hair color, skin color
- Responsive and visually polished table
- Loading state
- Error state with retry
- Previous/Next pagination using SWAPI's own links

## Stack

React + TypeScript + Vite + react-router-dom + React Hook Form + Zod + Fetch API + Vitest + React Testing Library + ESLint.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm test
npm run build
```

## Authentication note

The task does not provide a real authentication API. For the demo, any non-empty username/password is accepted after client-side validation. The session is kept in `sessionStorage` only to demonstrate route protection.

## API note

SWAPI is a public API and provides a paginated people resource. The application consumes the API response directly and follows its `next` and `previous` links.

## Architecture

```text
LoginPage
  -> LoginForm
  -> RHF + Zod
  -> AuthContext
  -> React Router
  -> ProtectedRoute
  -> TablePage
  -> usePeople
  -> peopleApi
  -> fetch
  -> SWAPI
```

The application is intentionally small and avoids unnecessary global state or backend infrastructure for this assignment.

## Portfolio note

This is an independent take-home implementation. It is not an official Fibank application and does not connect to Fibank systems.
